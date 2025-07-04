import { PiTrendUpThin } from "react-icons/pi";
import { useTranslations } from "next-intl";

/**
 * Display the inline card edit button
 * @returns 
 */
const InlineCardTrendButton = ({callback}) => {
    const t = useTranslations('trans');

    return (
        <button className="hover:bg-white bg-gray-50 rounded-md p-1 hover:shadow-lg hover:scale-105 transition-transform"
            data-tooltip-id="edit-tooltip"
            data-tooltip-content={t("trend")}
            onClick={callback}>
            <PiTrendUpThin className="text-[20px] text-gray-600"/>
        </button>
    );
}

export default InlineCardTrendButton;