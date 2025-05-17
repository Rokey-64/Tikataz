import React from "react";
import { useTranslations } from "next-intl";

const DisplayItemHeader = ({ itemName }) => {
    const t = useTranslations('trans');

    return (
        <div className="mb-2">
            <h2 className="text-base font-semibold text-gray-900">{t("confirm_delete_row")}</h2>
            <div>
                <p className="text-[12px] text-gray-500 italic">
                    {t("item_delete_name")} {itemName || t("item_no_name")}
                </p>
                <p className="text-[12px] text-gray-500 italic">
                    {t("confirm_delete_message")}
                </p>
            </div>
        </div>
    );
};

export default DisplayItemHeader;