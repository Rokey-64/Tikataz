import { useTranslations } from "next-intl";
import { MdLibraryAdd } from "react-icons/md";

/**
 * This component is a button that shows a certification selector when clicked
 * @returns 
 */
const CertificatesSelectButton = ({callback}) => {
    const t = useTranslations("trans");
    return (
        <div className="flex items-center gap-4">
            <p className="font-semibold text-lg text-gray-700">{t("studio.card.cert.m27")}</p>
            <button className="flex items-center gap-2" onClick={() => callback&&callback()}>
                <MdLibraryAdd className="text-2xl text-gray-600 hover:text-blue-500 animate-bounce hover:animate-none" />
            </button>
        </div>
    );
};

export default CertificatesSelectButton;