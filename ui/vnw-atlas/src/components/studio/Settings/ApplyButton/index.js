import { useTranslations } from "next-intl";

/**
 * ApplyButton component
 * @param {*} onClick - the event when the button is clicked
 * @param {*} hasChanged - the flag to check if there is any change
 * @returns 
 */
const ApplyButton = ({ onClick, hasChanged }) => {
    const t = useTranslations('trans');
    return (
        <button onClick={onClick} disabled={!hasChanged}
        className={`px-2 py-1 rounded-md border  text-[13px] font-semibold
                        ${hasChanged ? 'bg-blue-400 hover:bg-blue-500 text-white border-gray-300' : 'bg-gray-300 text-white border-gray-300'}`}>
            {t("apply")}
        </button>
    );
};

export default ApplyButton;