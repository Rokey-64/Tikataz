import { useTranslations } from "next-intl";
/**
 * Display the header of the provider display
 */
const ProviderDisplayHeader = () => {
    const t = useTranslations('trans');
    return (
        <div className="mb-2">
            <h2 className="text-base font-semibold text-gray-900">{t("add_provider")}</h2>
            <div>
                <p className="text-[12px] text-gray-500 italic">
                    {t("add_provider_1")}
                </p>
                <p className="text-[12px] text-gray-500 italic pl-4">
                    {t("add_provider_2")}
                    <br />
                    <span>

                    </span>
                </p>

            </div>
        </div>
    );
};

export default ProviderDisplayHeader;