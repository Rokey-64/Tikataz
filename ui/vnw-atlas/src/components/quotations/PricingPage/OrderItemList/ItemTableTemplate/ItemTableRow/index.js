import { useState, useEffect } from "react";
import ItemTableCell from "../ItemTableCell";
import ProductArea from "./ProductArea";
import DisplayHashtags from "./DisplayHashtags";
import ProviderList from "./ProviderList";
import CellInputBox from "../../../../common/CellInputBox";
import AddHashtagButton from "../../../../common/AddHashtagButton";
import AddProviderButton from "../../../../common/AddProviderButton";
import { useAppContext } from "../../../../../../contexts/RFQItemOrder";
import _ from "lodash";
import { useTranslations } from "next-intl";

const ItemTableRow = ({ hashtagEvent, providerEvent, itemID, pos }) => {
    const t = useTranslations('trans');
    const { state, dispatch, orderItem } = useAppContext();
    const [item, setItem] = useState(orderItem);
    useEffect(() => {
        const itemAtIndex = state.pricing.find((obj) => obj.id === itemID);
        if (itemAtIndex) setItem(_.cloneDeep(itemAtIndex));
    }, [state.pricing]);

    /**
     * Raise an event when the order item changes
     * @param {*} key 
     * @param {*} value 
     */
    const inputOnChange = (key, value) => {
        const cloneObject = _.cloneDeep(state.pricing);
        const objectAtIndex = cloneObject.find((obj) => obj.id === itemID);
        if (!objectAtIndex) return;
        else {
            objectAtIndex[key] = value;
            dispatch({ type: 'SET_ORDER_ITEM', payload: cloneObject });
        }
    };

    /**
     * Delete a provider
     * @param {*} index 
     * @returns 
     */
    const removeProvider = (index) => {
        const cloneObject = _.cloneDeep(state.pricing);
        const objectAtIndex = cloneObject.find((obj) => obj.id === itemID);
        if (!objectAtIndex) return;
        objectAtIndex.providerCode.splice(index, 1);

        dispatch({ type: 'SET_ORDER_ITEM', payload: cloneObject });
    };

    return (

        
        <div className="flex text-sm text-gray-800 ">
            <ItemTableCell type="body" width="w-10" pos="justify-center items-center">{pos}</ItemTableCell>
            <ItemTableCell type="body" width="w-[18rem]" pos="justify-center items-center">
                <ProductArea item={item} />
            </ItemTableCell>
            <ItemTableCell type="body" width="w-36" pos="justify-center items-center pt-4">
                <div className="min-w-[130px] text-start">
                    <CellInputBox title="Quy cách" value={item.specification} type="text" onChange={inputOnChange.bind(this, "specification")} maxLength={100}/>
                </div>
            </ItemTableCell>
            <ItemTableCell type="body" width="w-32" pos="justify-center items-center pt-4">
                <div className="min-w-[50px] text-start">
                    <CellInputBox title="Số lượng" value={item.quantity} type="number" onChange={inputOnChange.bind(this, "quantity")} />
                </div>
            </ItemTableCell>
            <ItemTableCell type="body" width="w-28" pos="justify-center items-center pt-4">
                <div className="min-w-[50px] text-start">
                    <CellInputBox title="Đơn vị" value={item.unit} type="text" onChange={inputOnChange.bind(this, "unit")} maxLength={50}/>
                </div>
            </ItemTableCell>
            <ItemTableCell type="body" width="w-[16rem]" pos="justify-start items-center">
                <div>
                    <div className="min-w-[245px] text-start">
                        <CellInputBox title="Mô tả" value={item.description} type="text" onChange={inputOnChange.bind(this, "description")} maxLength={300}/>
                    </div>
                    <div className="flex flex-wrap min-w-[50px] text-start gap-x-3">
                        <AddHashtagButton description="Hashtag" event={() => { hashtagEvent(itemID) }} />
                        <DisplayHashtags hashtags={item.hashtag} />
                    </div>
                </div>
            </ItemTableCell>
            <ItemTableCell type="body" width="w-[7rem]" pos="justify-center items-center">
                <div>
                    <ProviderList providers={item.providerCode} removeEvent={removeProvider} />
                    {
                        item.providerCode.length < 3 ? <AddProviderButton description={t("choose")} event={() => { providerEvent(itemID) }} /> : null
                    }
                </div>
            </ItemTableCell>
        </div>
    );
};

export default ItemTableRow;
