import { IoRemoveCircle } from "react-icons/io5";
import { useTranslation } from "react-i18next";

/**
 * Remove item button component
 * @param {*} param0 
 * @returns 
 */
const RemoveItemButton = ({ onClick, addClass}) => {
    const { t } = useTranslation();
    return (
        <button
            onClick={onClick}
            className={`flex items-center justify-center text-red-300 hover:text-red-500 ${addClass}`}
             data-tooltip-id="pricing-tooltip" data-tooltip-content={t("delete_row")}>
            <IoRemoveCircle className="w-4 h-4"/>
        </button>
    );
};

export default RemoveItemButton;