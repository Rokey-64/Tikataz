import { useTranslations } from "next-intl";

/**
 * Cancel button
 * @param {*} param0 
 * @returns 
 */
const OrderConfirmButton = ({ onSubmit }) => {
    const t = useTranslations('trans');

    const onButtonClick = () => {
        onSubmit&&onSubmit();
    }
    return (
        <button
            type="button"
            onClick={onButtonClick}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
            {t("confirm")}
        </button>
    );
};

export default OrderConfirmButton;