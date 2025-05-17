import { useTranslations } from "next-intl";
/**
 * Display the header of the items display
 */
const ItemDialogHeader = () => {
    const t = useTranslations('trans');
    return (
        <div className="mb-2">
            <h2 className="text-base font-semibold text-gray-900">{t("your_item_list")}</h2>
            <div>
                <p className="text-[12px] text-gray-500 italic">
                    {t("your_item_list_1")}
                </p>

            </div>
        </div>
    );
};

export default ItemDialogHeader;