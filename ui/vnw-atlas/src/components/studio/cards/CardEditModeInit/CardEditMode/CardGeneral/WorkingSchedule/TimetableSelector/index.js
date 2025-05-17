import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setGeneral } from "@/redux/cardsSlice";
import InsertNoticeText from "@/components/studio/common/InsertNoticeText";
import debounce from "lodash.debounce";
import { useTranslations } from "next-intl";

/**
 * Display a timetable from Monday to Sunday and allow the user to set the working time
 * @returns 
 */
const TimetableSelector = () => {
    const t = useTranslations("trans");
    const general = useSelector(state => state.cards.general);
    const dispatch = useDispatch();
    const daysOfWeek = [
        t("studio.card.gen.mon"),
        t("studio.card.gen.tue"),
        t("studio.card.gen.wed"),
        t("studio.card.gen.thu"),
        t("studio.card.gen.fri"),
        t("studio.card.gen.sat"),
        t("studio.card.gen.sun")
    ];
    const [timeData, setTimeData] = useState(
        daysOfWeek.map(
            (day, index) => ({ start: index === 6 ? "" : "08:00", end: index === 6 ? "" : "17:00", active: index === 6 ? false : true, index: index })
        )
    );

    useEffect(() => {
        // Set the time for sunday to empty
        const updatedTimeData = general.workingTime.map((day, index) => {
            return { start: day.start, end: day.end, active: day.active, index: index };
        });
        setTimeData(updatedTimeData);
    }, [general]);

    /**
     * Update the working time in the redux store
     */
    const timeChangedDebounced = useCallback(
        debounce((value, general) => {
            dispatch(setGeneral({ ...general, workingTime: value }));
        }, 500),
        []
    );

    /**
     * Raise an event when the time is changed
     * @param {*} dayIndex
     * @param {*} type
     * @param {*} value
     * @returns
     *  */
    const handleTimeChange = (dayIndex, type, value) => {
        ;
        const updatedTimeData = [...timeData];
        const sundayIndex = 6;
        const mondayIndex = 0;

        // If there is monday, set all days to the same time except sunday
        if (dayIndex === mondayIndex) {
            updatedTimeData.forEach((day, index) => {
                if (index !== sundayIndex && day.active) {
                    updatedTimeData[index][type] = value;
                }
            });
        }
        else updatedTimeData[dayIndex][type] = value;

        setTimeData(updatedTimeData);

        timeChangedDebounced(updatedTimeData, general);
    };

    /**
     * Get the read only status of the input
     * 
     * @param {*} index
     * @returns
     * */
    const getReadOnly = (index) => {
        if (timeData[index].active) return false;
        return true;
    };


    /**
     * Raise an event when the checkbox is checked or unchecked
     * @param {*} dayIndex 
     * @param {*} value 
     */
    const toggleActive = (dayIndex, value) => {
        const updatedTimeData = [...timeData];

        // Update the active status
        updatedTimeData[dayIndex].active = value;

        // If checked, set the time to the same as monday, else set to empty
        updatedTimeData[dayIndex]["start"] = value ? updatedTimeData[0]["start"] || "08:00" : "";
        updatedTimeData[dayIndex]["end"] = value ? updatedTimeData[0]["end"] || "05:00" : "";

        setTimeData(updatedTimeData);
        timeChangedDebounced(updatedTimeData, general);
    };

    return (
        <div className="overflow-auto">
            <div>
                <table className="w-full border-collapse border border-gray-300 text-[12px]">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2 text-center">{t("studio.card.gen.day")}</th>
                            <th className="border border-gray-300 px-4 py-2 text-center">{t("studio.card.gen.start")}</th>
                            <th className="border border-gray-300 px-4 py-2 text-center">{t("studio.card.gen.end")}</th>
                            <th className="border border-gray-300 px-4 py-2 text-center">{t("studio.card.gen.active")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {daysOfWeek.map((day, index) => (
                            <tr key={index}>
                                <td className="border border-gray-300 px-4 py-2 text-center">{day}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    <input
                                        type="time"
                                        value={timeData[index].start}
                                        onChange={(e) =>
                                            handleTimeChange(index, "start", e.target.value)
                                        }
                                        readOnly={getReadOnly(index)}
                                        className={`border rounded px-2 py-1 w-full ${getReadOnly(index) ? "bg-gray-200" : ""}`}
                                    />
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    <input
                                        type="time"
                                        value={timeData[index].end}
                                        onChange={(e) =>
                                            handleTimeChange(index, "end", e.target.value)
                                        }
                                        readOnly={getReadOnly(index)}
                                        className={`border rounded px-2 py-1 w-full ${getReadOnly(index) ? "bg-gray-200" : ""}`}
                                    />
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    <input
                                        type="checkbox"
                                        checked={timeData[index].active}
                                        onChange={(e) => toggleActive(index, e.target.checked)}
                                        className="w-4 h-4"
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="col-span-2 mt-6 max-w-[700px]">
                <InsertNoticeText
                    header={t("studio.card.gen.timerule")}
                    content={
                        t.rich("studio.card.gen.timemess", {
                            strong: (chunks) => <strong>{chunks}</strong>,
                            br: () => <br />,
                            i: (chunks) => <i>{chunks}</i>
                        })
                    }
                />
            </div>
        </div>
    );
};

export default TimetableSelector;
