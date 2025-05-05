import { MdAddBox } from "react-icons/md";
import { MdHistoryEdu } from "react-icons/md";
import { MdProductionQuantityLimits } from "react-icons/md";
import PanelButton from "../../common/PanelButton";
import HeaderDisplay from "../../common/HeaderDisplay";
import { useTranslation } from "react-i18next";
import { useCallback } from "react";
import { debounce } from "lodash";
import { useRouter } from 'next/navigation';

/**
 * Contains the RFQ History component.
 * @returns 
 */
const RFQHistory = () => {
    const { t } = useTranslation();
    const router = useRouter();

    const createQuotation = useCallback(debounce(() => {
        router.push(`/rfq/dashboard/history`);
    }, 1000), []);

    return (
        <div>
            <HeaderDisplay title={t("rfq_history_title")} />
            <div className="flex flex-wrap justify-start items-center w-full h-full space-x-4">
                <PanelButton
                    icon={MdAddBox}
                    imgBg={<MdHistoryEdu className="text-[60px] text-black"/>}
                    content={t("rfq_history")}
                    grad="bg-gradient-to-b from-[#FFC700] to-[#FF8E00]"
                    event={createQuotation} />

                <PanelButton
                    icon={MdAddBox}
                    imgBg={<MdProductionQuantityLimits className="text-[60px] text-yellow-900"/>}
                    content={t("rfq_products")}
                    grad="bg-gradient-to-b from-[#00FF9D] to-[#008B45]"/>
            </div>
        </div>
    );
};

export default RFQHistory;