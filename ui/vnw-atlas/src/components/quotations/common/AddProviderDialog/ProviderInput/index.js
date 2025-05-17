import { useTranslations } from "next-intl";
/**
 * This is a ProviderInput component
 * @returns 
 */
const ProviderInput = ({provider, event}) => {
    const t = useTranslations('trans');
    
    return (
        <input
            type="text"
            placeholder={t("add_provider_3")}
            value={provider}
            // rows={3}
            onChange={event}
            // spellCheck="false"
            className="w-full p-1 mb-2 border border-gray-300 rounded resize-none text-[13px] font-sans border-none ring-1 outline-none"
        />
    );
};

export default ProviderInput;