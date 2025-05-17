import { useTranslations } from "next-intl";

/**
 * Save button for certificates
 * @param {} param0 
 * @returns 
 */
const CertificesSaveButton = ({saveCert }) => {
    const t = useTranslations("trans");
    return (
        <div className="col-span-2 flex justify-end">
            <button className="w-[100px] p-1 bg-blue-500 text-white rounded shadow-sm hover:bg-blue-600 text-[12px]" onClick={saveCert}>
                {t("save")}
            </button>
        </div>
    );
};

export default CertificesSaveButton;