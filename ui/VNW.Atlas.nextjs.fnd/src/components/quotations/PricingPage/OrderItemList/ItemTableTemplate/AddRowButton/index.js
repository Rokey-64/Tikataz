import { MdLibraryAdd } from "react-icons/md";
import { useTranslation } from "react-i18next";

/**
 * The add row button for the item table
 * @param {*} param0 
 * @returns 
 */
const AddRowButton = ({ onClick }) => {
    const { t } = useTranslation();
    return (
        <p className="text-blue-600 hover:text-blue-800 w-fit cursor-pointer hover:underline font-sans text-sm mt-3"
            data-tooltip-id="pricing-tooltip"
            data-tooltip-content={t("add_new_item")}
            onClick={onClick}>
            <div className="flex items-center gap-x-2">
                <MdLibraryAdd size={22} />
                <span>{t("add_new")}</span>
            </div>
        </p>
    );
};

export default AddRowButton;
