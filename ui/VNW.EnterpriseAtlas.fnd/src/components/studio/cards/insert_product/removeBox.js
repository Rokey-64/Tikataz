import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setProducts } from "../../../../redux/cardsSlice";
import RightDeleteContainer from "../../common/right_delete_container";
import CardMessages from "../../common/messages";

/**
 * Display the remove box when the delete mode is on
 * @param {*} param0 
 * @returns 
 */
const RemoveProdBox = ({ delStatus, setDelStatus }) => {

    const dispatch = useDispatch();
    const products = useSelector((state) => state.cards.products);

    const deleteCallback = () => {
        const newProducts = products.items.filter((prod) => prod.id !== delStatus.currentObjects[0]?.id);
        URL.revokeObjectURL(delStatus.currentObjects[0]?.image);
        dispatch(setProducts({ ...products, items: newProducts }));

        setDelStatus({ ...delStatus, status: false, currentObjects: [] });
    };

    const state = {
        currentObjects: [{
            name:
                <div className="flex items-center">
                    <img
                        src={delStatus.currentObjects[0]?.image}
                        alt="product"
                        className="w-32 h-32 rounded-full object-cover"
                    />
                </div>
        }],
    };

    const setStateHandler = (state) => {
        setDelStatus(state);
    };

    if (!delStatus.status) return null;
    return (
        <RightDeleteContainer state={state} setState={setStateHandler} callback={deleteCallback}
            headerContent={<h1 className="text-[18px]"><strong>Xóa sản phẩm, hìn ảnh minh họa</strong></h1>}
            children={
                <div>
                    <CardMessages type="CardRemoveProduct" />

                </div>
            } />
    )
};

export default RemoveProdBox;