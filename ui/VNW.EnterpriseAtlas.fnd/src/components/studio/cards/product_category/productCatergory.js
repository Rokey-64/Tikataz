import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setProducts } from "../../../../redux/cardsSlice";
import InsertProduct from "../insert_product/index";
import { nanoid } from "@reduxjs/toolkit";
import RemoveProdBox from "../insert_product/removeBox";

const CustomerCategory = () => {
    const dispatch = useDispatch();
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
        const itemsAt = products.items.filter((item) => item.position === index);
        if (itemsAt.length > 0) {
            return {...itemsAt[0]};
        }
        return {
            name: "",
            image: "",
            id: nanoid(),
            position: index
        };
    }

    const deleteItemHandler = (item) => {
        if (!item.image && !item.name) return;
        setDelStatus({...delStatus, status: true, currentObjects: [item]});
    }

    return (
        <div className="mb-6">
            <div>
                <p className="font-semibold mb-2">Thêm hình ảnh minh họa sản phẩm</p>
            </div>
            <div className="flex flex-wrap max-w-[1200px]">
                {Array(8).fill().map((_, index) => (
                    <div key={index} className="w-[275px] ml-1 mb-2">
                        <InsertProduct item={getItemAtIndex(index)} callback={deleteItemHandler}/>
                    </div>
                ))}
            </div>

            <RemoveProdBox delStatus={delStatus} setDelStatus={setDelStatus}/>
        </div>
    );
}

export default CustomerCategory;