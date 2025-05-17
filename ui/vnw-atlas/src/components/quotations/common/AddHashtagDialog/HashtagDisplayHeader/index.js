import React from "react";
import { useTranslations } from "next-intl";

const HashtagDisplayHeader = () => {
    const t = useTranslations('trans');

    return (
        <div className="mb-2">
            <h2 className="text-base font-semibold text-gray-900">{t("add_hashtag")}</h2>
            <div>
                <p className="text-[12px] text-gray-500 italic">
                    {t("support_provider")}
                </p>
                <p className="text-[12px] text-gray-500 italic pl-4">
                    {t("hashtag_node_1")}<br/>
                    {t("hashtag_node_2")}
                    <br/>
                    <span>
                       {t("example")} <b className="text-blue-500 hover:text-blue-700 hover:underline mr-2">#hashtag1</b>
                         <b className="text-blue-500 hover:text-blue-700 hover:underline mr-2">#hashtag2</b>
                    </span>
                </p>

            </div>
        </div>
    );
};

export default HashtagDisplayHeader;
