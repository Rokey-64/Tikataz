import { useTranslations } from "next-intl";

/**
 * Display certificate provider
 * @param {*} param0 
 * @returns 
 */
const CertificatesProvider = ({ cert }) => {
    const t = useTranslations('trans'); 

    return (
        <div className="mb-2">
            <span className="font-medium">{t("studio.card.cert.providedby")}: </span> {cert.certProvider || t("unknown")}
        </div>
    );
};

export default CertificatesProvider;