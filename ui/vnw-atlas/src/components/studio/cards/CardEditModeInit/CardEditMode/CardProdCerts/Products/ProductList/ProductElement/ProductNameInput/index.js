import { useTranslations } from "next-intl";

/**
 * This component is a text input for product name
 * @param {*} param0 
 * @returns 
 */
const ProductNameInput = ({ displayStatus, setDisplayStatus, prodName, callback}) => {
    const t = useTranslations("trans");
    if (!displayStatus) return <></>;

    const inputHandler = (e) => {
        callback&&callback(e);
    }

    return <input
        type="text"
        value={prodName === t("studio.card.product.noinput") ? "" : prodName}
        onChange={inputHandler}
        placeholder={t("studio.card.product.name")}
        className="border rounded w-full mt-2 p-2 text-sm"
        onBlur={() => setDisplayStatus(false)}
    />
};

export default ProductNameInput;