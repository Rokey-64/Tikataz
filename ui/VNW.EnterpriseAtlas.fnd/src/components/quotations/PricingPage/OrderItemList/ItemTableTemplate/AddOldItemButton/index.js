import { MdManageHistory } from "react-icons/md";
import { useTranslation } from "react-i18next";

/**
 * The add row button for the item table
 * @param {*} param0 
 * @returns 
 */
const AddOldItemButton = ({ onClick }) => {
    const { t } = useTranslation();
    return (
        <p className="text-gray-600 hover:text-gray-800 w-fit cursor-pointer hover:underline font-sans text-sm mt-3"
            data-tooltip-id="pricing-tooltip" 
            data-tooltip-content={t("choose_from_list")}
            onClick={onClick}>
                
            <div className="flex items-center gap-x-1">
                <MdManageHistory size={22} />
                <span>{t("choose")}</span>
            </div>
        </p>
    );
};

export default AddOldItemButton;
