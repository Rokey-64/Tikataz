import { useTranslations } from "next-intl";
import { GiPriceTag } from "react-icons/gi";

const ComfirmTitle = ({ title }) => {
    const t = useTranslations('trans');

    return (
        <div className="flex items-center gap-2 uppercase">
            <GiPriceTag className="text-4xl text-yellow-600 drop-shadow-[0_0_6px_rgba(255,193,7,0.8)]" />
            <h2 className="text-xl font-semibold text-yellow-600 ">
                {t("confirm_order_title")}
            </h2>
        </div>
    );
}

export default ComfirmTitle;
