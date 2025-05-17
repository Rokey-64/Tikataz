import { useState } from "react";
import TimetableSelector from "./TimetableSelector";
import { useTranslations } from "next-intl";

/**
 * This component contains the working time of the company
 * @param {*} param0 
 * @returns 
 */
const WorkingSchedule = () => {
    const t = useTranslations("trans");
    const [message, setMessage] = useState("");
    return (
        <div className="min-w-[450px]  sticky top-4">
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="col-span-2 ">
                    <div className="flex items-start gap-5">
                        <label className="block font-semibold mb-2 text-[14px]">{t("studio.card.gen.schedule")}</label>
                        <p className="text-[14px] text-red-500">{message}</p>
                    </div>
                    <div className="flex items-center gap-5 ">
                        <TimetableSelector />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkingSchedule;