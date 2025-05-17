
import HeaderDisplay from "../../common/HeaderDisplay";
import Messages from "../../common/Messages";
import PrioritySelection from "./PrioritySelection";
import { useTranslations } from "next-intl";

/**
 * The provider filter panel
 * @param {*} param0 
 * @returns 
 */
const ProviderFilter = ({ orderItems }) => {
    const t = useTranslations('trans');
    return (
        <div className="p-3 space-y-3">
            <HeaderDisplay title={t("order_filter")}/>
            <Messages type="AutRFQFilterMessage" />
            <PrioritySelection />
        </div>
    );
};

export default ProviderFilter;