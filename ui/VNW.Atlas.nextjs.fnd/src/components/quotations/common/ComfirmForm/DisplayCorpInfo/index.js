import { useAppContext } from '../../../../../contexts/RFQItemOrder';
import { useTranslation } from "react-i18next";
import DisplayElement from "./DisplayElement";
/**
 * DisplayCorpInfo component
 * @param {*} param0 
 * @returns 
 */
const DisplayCorpInfo = () => {
    const { t } = useTranslation();
    const { state } = useAppContext();

    return (
        <div className="text-gray-700 text-xs font-sans gap-2">
            <DisplayElement dictWord={t('company')} value={state.profile.org} />
            <DisplayElement dictWord={t('tax_code')} value={state.profile.tax} />
            <DisplayElement dictWord={t('Quote')} value={state.general.orderName} />
            <DisplayElement dictWord={t('deadline')} value={`${state.general.orderCreatedAt} ~ ${state.general.orderDueDate}`} />
        </div>
    );
}

export default DisplayCorpInfo;