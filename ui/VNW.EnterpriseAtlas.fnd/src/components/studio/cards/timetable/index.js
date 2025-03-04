import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setGeneral } from "../../../../redux/cardsSlice";
import InsertNoticeText from "../../insert_notice/index";
import TextSingleInput from "../text_single_input";
import debounce from "lodash.debounce";

const TimeTable = () => {
    const general  = useSelector(state => state.cards.general);
    const dispatch = useDispatch();
    const daysOfWeek = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ Nhật"];
    const [timeData, setTimeData] = useState(
        daysOfWeek.map(
            (day, index) => ({ start: index === 6 ? "" : "08:00", end: index === 6 ? "" : "17:00", active: index === 6 ? false : true , index: index })
        )
    );
    const [readOnly, setReadOnly] = useState(false);

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
    const handleTimeChange = (dayIndex, type, value) => {;
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
                            <th className="border border-gray-300 px-4 py-2 text-center">Ngày</th>
                            <th className="border border-gray-300 px-4 py-2 text-center">Bắt đầu</th>
                            <th className="border border-gray-300 px-4 py-2 text-center">Kết thúc</th>
                            <th className="border border-gray-300 px-4 py-2 text-center">Hoạt động</th>
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
                    header="Quy tắc về thiết lập thời gian làm việc?"
                    content={
                        <>
                            * Thời gian làm việc, là thời gian để Tikataz tham chiếu, từ đó căn cứ gửi báo giá hoặc đơn hàng đến với bạn.
                            Bảng thời gian thể hiện từ thứ 2 đến chủ nhật, mặc định thời gian làm việc là từ 8 giờ sáng đến 5 giờ chiều<br /><br />

                            * <strong>Lưu ý</strong>: <i>
                                Nếu bạn điều chỉnh thời gian ở thứ 2, hệ thống sẽ áp dụng cho các ngày khác trong tuần trừ chủ nhật và ngày nghỉ.<br /><br />
                                Nếu ngày hôm đó không làm việc, vui lòng bỏ tích ở ô hoạt động.<br /><br />
                                Các ngày lễ, ngày nghĩ theo quy định của quốc gia đăng ký sẽ không được tính vào thời gian làm việc.
                            </i>
                        </>
                    }
                />
            </div>
        </div>
    );
};

export default TimeTable;
