import { useTranslation } from "react-i18next";

/**
 * Cancel button
 * @param {*} param0 
 * @returns 
 */
const OrderCancelButton = ({ onCancel }) => {
    const { t } = useTranslation();

    const onButtonClick = () => {
        onCancel&&onCancel();
    }
    return (
        <button
            type="button"
            onClick={onButtonClick}
            className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100"
        >
            {t("cancel")}
        </button>
    );
};

export default OrderCancelButton;