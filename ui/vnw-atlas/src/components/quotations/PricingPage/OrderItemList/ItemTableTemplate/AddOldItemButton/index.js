import { MdManageHistory } from "react-icons/md";
import { useTranslations } from "next-intl";

/**
 * The add row button for the item table
 * @param {*} param0 
 * @returns 
 */
const AddOldItemButton = ({ onClick }) => {
    const t = useTranslations('trans');
    return (
        <p className="text-gray-600 hover:text-gray-800 w-fit cursor-pointer hover:underline font-sans text-sm mt-3"
            data-tooltip-id="pricing-tooltip" 
            data-tooltip-content={t("choose_from_list")}
            onClick={onClick}>
                
            <div className="flex items-center gap-x-1">
                <MdManageHistory size={22} />
                <span>{t("your_items_add")}</span>
            </div>
        </p>
    );
};

export default AddOldItemButton;
