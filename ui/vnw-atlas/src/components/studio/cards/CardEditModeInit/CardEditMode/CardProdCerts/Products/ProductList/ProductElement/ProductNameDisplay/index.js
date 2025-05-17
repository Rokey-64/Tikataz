import { useTranslations } from "next-intl";

/**
 * This is a component for displaying the product name
 * @param {*} prodName - product name 
 * @returns 
 */
const ProductNameDisplay = ({ prodName }) => {
    const t = useTranslations("trans");
    return (
        <span className="text-gray-700 text-sm">
            <strong>{prodName ? "" : t("studio.card.product.name")}</strong> {prodName}
        </span>
    );
};

export default ProductNameDisplay;