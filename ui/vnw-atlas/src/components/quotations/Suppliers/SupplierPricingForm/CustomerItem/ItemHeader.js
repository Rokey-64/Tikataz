import { useTranslations } from "next-intl";

const ItemHeader = ({ item}) => {
    const t = useTranslations('trans');

    const itemDetails = [
        { label: t("item_specification"), value: item.specification },
        { label: t("item_quantity"), value: item.quantity },
        ...(item.description ? [{ label: t("item_description"), value: item.description }] : [])
    ];

    return (
        <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-800">
                {item.name}
            </h3>

            <div className="space-y-1.5">
                {itemDetails.map((detail, index) => (
                    <p key={`${detail.label}-${index}`} className="text-gray-600">
                        <span className="font-medium text-gray-700">{detail.label}:</span>{' '}
                        <span className="text-gray-600">{detail.value}</span>
                    </p>
                ))}
            </div>
        </div>
    );
};

export default ItemHeader;