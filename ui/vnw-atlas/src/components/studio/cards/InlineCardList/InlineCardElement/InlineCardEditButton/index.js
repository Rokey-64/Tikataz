import { FiEdit } from "react-icons/fi";
import { useTranslations } from "next-intl";

/**
 * Display the inline card edit button
 * @returns 
 */
const InlineCardEditButton = ({callback}) => {
    const t = useTranslations('trans');

    return (
        <button className="hover:bg-white bg-gray-50 rounded-md p-1 hover:shadow-lg hover:scale-105 transition-transform"
            data-tooltip-id="edit-tooltip"
            data-tooltip-content={t("edit")}
            onClick={callback}>
            <FiEdit className="text-[20px] stroke-2 text-gray-600" />
        </button>
    );
}

export default InlineCardEditButton;