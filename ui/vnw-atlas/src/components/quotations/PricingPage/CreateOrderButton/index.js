import { useTranslations } from "next-intl";
/**
 * A button to confirm the order
 * @param {Object} props 
 * @param {Function} props.onClick - Function to handle button click
 * @param {string} [props.className] - Optional additional class names
 * @returns {JSX.Element}
 */
const CreateOrderButton = ({ onClick }) => {
    const t = useTranslations('trans');

    return (
        <button
            className="w-fit px-2 py-1 rounded-lg bg-gradient-to-r from-[#7393d8] to-[#4f46e5] text-white border-gray-400 text-[14px] font-sans
                    hover:from-[#1e40af] hover:to-[#4338ca] active:scale-95 duration-300"
            onClick={onClick}
        >
            {t("order_create")}
        </button>
    );
};

export default CreateOrderButton;


