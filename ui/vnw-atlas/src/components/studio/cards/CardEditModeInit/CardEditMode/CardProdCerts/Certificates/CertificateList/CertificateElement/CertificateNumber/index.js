import { useTranslations } from "next-intl";

/**
 * Display the certificate number
 * @param {*} param0 
 * @returns 
 */
const CertificateNumber = ({ cert }) => {
    const t = useTranslations('trans'); 

    return (
        <div className="mb-2">
        <span className="font-medium">{t("studio.card.cert.certcode")}: </span> {cert.certCode || t("unknown")}
    </div>
    );
};

export default CertificateNumber