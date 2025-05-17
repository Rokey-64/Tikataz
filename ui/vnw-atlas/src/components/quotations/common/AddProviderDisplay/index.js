import { useMemo } from "react";
import { BsPersonVcardFill } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { useTranslations } from "next-intl";

/**
 * Display provider icon with delete functionality & random color
 */
const AddProviderDisplay = ({ provider, event }) => {
    const t = useTranslations('trans');
    const colors = ["text-blue-500", "text-green-500", "text-purple-500", "text-yellow-500", "text-pink-500"];

    const randomColor = useMemo(() => colors[Math.floor(Math.random() * colors.length)], []);

    return (
        <div className="relative inline-block group"
            data-tooltip-id="pricing-tooltip"  data-tooltip-content={`${t("provider")} ${provider}`}>
            <BsPersonVcardFill size={24} className={randomColor} />
            <button onClick={event} className="absolute -top-1 -left-1 p-0.5 rounded-full bg-white shadow-md hover:bg-gray-200 
                           opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <IoClose size={9} className="text-red-500" />
            </button>
        </div>
    );
};

export default AddProviderDisplay;
