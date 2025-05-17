import { useState } from "react";
import { useSelector } from "react-redux";
import ProductDeleteMode from "./productDeleteMode";
import ProductList from "./ProductList";
import Messages from "@/components/studio/common/Messages";
import { useTranslations } from "next-intl";

const Products = () => {
    const t = useTranslations("trans");
    const products = useSelector((state) => state.cards.products);

    /**
     * Delete mode state
     */
    const [delStatus, setDelStatus] = useState({
        status: false,
        currentObjects: []
    });

    /**
     * Get item at index or create a new item
     * @param {*} index 
     * @returns 
     */
    const getItemAtIndex = (index) => {
        const itemsAt = products.filter((item) => {
            return Number(item.position) === Number(index)
        });
        if (itemsAt.length > 0) {
            return { ...itemsAt[0] };
        }
        return {
            name: "",
            image: "",
            id: index,
            position: index
        };
    }

    const deleteItemHandler = (item) => {
        if (!item.image && !item.name) return;
        setDelStatus({ ...delStatus, status: true, currentObjects: [item] });
    }

    return (
        <div className="flex flex-col">
            <Messages type="ProductMessage" />
            <div className="mb-6">
                <div>
                    <p className="font-semibold mb-2">{t("studio.card.product.addimg")}m</p>
                </div>
                <ProductList getItemAtIndex={getItemAtIndex} callback={deleteItemHandler} />
                <ProductDeleteMode delStatus={delStatus} setDelStatus={setDelStatus} />
            </div>
        </div>

    );
}

export default Products;