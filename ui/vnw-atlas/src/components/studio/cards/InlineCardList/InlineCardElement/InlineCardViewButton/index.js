import { FaEye } from "react-icons/fa";
import { useTranslation } from "react-i18next";

/**
 * Display the inline card edit button
 * @returns 
 */
const InlineCardViewButton = ({callback}) => {
    const { t } = useTranslation();

    return (
        <button className="hover:bg-white bg-gray-50 rounded-md p-1 hover:shadow-lg hover:scale-105 transition-transform"
            data-tooltip-id="edit-tooltip"
            data-tooltip-content={t("view")}
            onClick={callback}>
            <FaEye className="text-[20px] text-gray-600"/>
        </button>
    );
}

export default InlineCardViewButton;