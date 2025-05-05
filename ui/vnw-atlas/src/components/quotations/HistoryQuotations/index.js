import React, { useState } from 'react';
import { Tooltip } from "react-tooltip";
import { useTranslation } from "react-i18next";
import QuotationHeader from "./QuotationHeader";
import QuotationBody from "./QuotationBody";

/**
 * This component is used to display historical quotations.
 * @returns 1
 */
const HistoryQuotations = () => {
    const { t } = useTranslation();
    const [quotationType, setQuotationType] = useState("all");

    return (
        <div className="w-screen h-screen mt-5 md:mt-1">
            <div className="flex flex-col justify-start items-start overflow-y-auto overflow-x-auto
                 md:max-h-[calc(100vh-70px)] md:min-h-[calc(100vh-70px)]
                 max-h-[calc(100vh-100px)] min-h-[calc(100vh-100px)] w-[calc(100vw-10px)] md:w-[calc(100vw)] p-2">
                <Tooltip
                    id="history_quotation-tooltip"
                    place="bottom"
                    noArrow={false}
                    className="z-30 bg-[rgb(196,196,196)] text-[6px]"
                    style={{ backgroundColor: "rgb(196,196,196)", color: "#222", fontSize: "12px" }}
                    delayShow={300}
                />
                <QuotationHeader setType={setQuotationType} />
                <QuotationBody quotationType={quotationType} />
            </div>
        </div>
    );
};

export default HistoryQuotations;