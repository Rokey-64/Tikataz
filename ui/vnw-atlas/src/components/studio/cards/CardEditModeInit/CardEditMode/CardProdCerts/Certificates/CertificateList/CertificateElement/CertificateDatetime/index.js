import { useTranslations } from "next-intl";

/**
 * Display certificate time
 * @param {*} param0 
 * @returns 
 */
const CertificateDatetime = ({ cert }) => {
    const t = useTranslations('trans');
    return (
        <div className="mb-2">
            <span className="font-medium">{t("studio.card.cert.validtime")}: </span>
            {cert.certValidDate ? `${cert.certValidDate} - ${cert.certExpiredDate || t("unknown")}` : t("noinfo")}
        </div>
    );
};

export default CertificateDatetime;