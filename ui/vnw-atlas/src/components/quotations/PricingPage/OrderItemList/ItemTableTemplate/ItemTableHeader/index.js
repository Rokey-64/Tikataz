import ItemTableCell from "../ItemTableCell";
import { useTranslations } from "next-intl";

const ItemTableHeader = () => {
    const t = useTranslations('trans');
    return (
        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-t-lg w-fit">
            <div className="flex text-xs font-semibold ">
                <ItemTableCell type="header" width="w-10" pos="justify-center">{t("item_no")}</ItemTableCell>
                <ItemTableCell type="header" width="w-[18rem]" pos="justify-center">{t("item_info")}</ItemTableCell>
                <ItemTableCell type="header" width="w-36" pos="justify-center">{t("item_specification")}</ItemTableCell>
                <ItemTableCell type="header" width="w-32" pos="justify-center">{t("item_quantity")}</ItemTableCell>
                <ItemTableCell type="header" width="w-28" pos="justify-center">{t("item_unit")}</ItemTableCell>
                <ItemTableCell type="header" width="w-[16rem]" pos="justify-center">{t("item_description")}</ItemTableCell>
                <ItemTableCell type="header" width="w-[7rem]" pos="justify-center">{t("select_provider")}</ItemTableCell>
            </div>
        </div>
    );
};

export default ItemTableHeader;

