
import { useState, useEffect } from "react";
import { useAppContext } from "../../../../../contexts/RFQItemOrder";
import ItemTableHeader from "./ItemTableHeader";
import AddRowButton from "./AddRowButton";
import AddOldItemButton from "./AddOldItemButton";
import ItemTableRowDisplay from "./ItemTableRow";
import RemoveOrderItem from "./RemoveOrderItem";
import Messages from "../../../common/Messages";
import RemoveItemButton from "../../../common/RemoveItemButton";
import AddHashtagDialog from "../../../common/AddHashtagDialog";
import AddProviderDialog from "../../../common/AddProviderDialog";
import { useTranslation } from "react-i18next";
import { nanoid } from "nanoid";
import _, { set } from "lodash";

/**
 * This component is a template for the item table in the pricing page.
 * @param {*} param0 
 * @returns 
 */
const ItemTableTemplate = () => {
    const { t } = useTranslation();
    const [hoverIndex, setHoverIndex] = useState(-1);
    const [hashtagCurrID, setHashtagCurrID] = useState('');
    const [openProviderID, setOpenProviderID] = useState('');
    const [orderItemID, setRemoveOrderID] = useState('');
    const { state, dispatch, orderItem } = useAppContext();

    /**
     * Initialize the order item
     */
    useEffect(() => {
        if (state.pricing.length === 0) {
            dispatch({ type: 'SET_ORDER_ITEM', payload: [{ ...orderItem, id: nanoid() }] });
        }
    }, []);

    /**
     * Open the hashtag dialog
     */
    const hashtagOnclick = (id) => {
        setHashtagCurrID(id);
    };


    /**
     * Submit the hashtag
     * @param {*} hashtag 
     */
    const submitHashtagEvent = (hashtagList) => {
        if (!hashtagCurrID) return;
        const clonePricing = _.cloneDeep(state.pricing);
        const item = clonePricing.find((obj) => obj.id === hashtagCurrID);
        if (!item) return;

        item.hashtag = hashtagList;

        dispatch({ type: 'SET_ORDER_ITEM', payload: clonePricing });
        setHashtagCurrID('');
    };

    /**
     * Convert the hashtag list to a string
     * @returns 
     */
    const getHashtags = () => {
        const item = state.pricing.find((obj) => obj.id === hashtagCurrID);
        if (!item) return [];

        let hashtags = "";
        for (const hashtag of item.hashtag) {
            hashtags += `#${hashtag} `;
        }

        return hashtags;
    }


    /**
     * Raise an event when the provider is entered
     */
    const submitProviderEvent = (provider) => {
        if (!openProviderID || !provider) return;

        const MAX_PROVIDERs = 3;
        const clonePricing = _.cloneDeep(state.pricing);
        const item = clonePricing.find((obj) => obj.id === openProviderID);
        if (!item) return;

        if (item.providerCode.length >= MAX_PROVIDERs){
            alert(t("over_limit_provider"));
            return;
        }

        item.providerCode.push(provider);

        dispatch({ type: 'SET_ORDER_ITEM', payload: clonePricing });
        setOpenProviderID(false);
    }

    /**
     * add a new row to the table
     */
    const addRowEvent = () => {
        const cloneOrder = _.cloneDeep(orderItem);
        cloneOrder.id = nanoid();
        dispatch({ type: 'SET_ORDER_ITEM', payload: [..._.cloneDeep(state.pricing), cloneOrder] });
    }


    return (
        <div className="w-fit">
            <Messages type="CertMessage2" />
            <div className="bg-white rounded-lg overflow-hidden ">
                <ItemTableHeader />

                <div>
                    <RemoveOrderItem openId={orderItemID} onClose={() => { setRemoveOrderID(''); }} />
                    <AddHashtagDialog open={hashtagCurrID} onClose={() => setHashtagCurrID('')} onAdd={submitHashtagEvent} initialHashtag={getHashtags()} />
                    <AddProviderDialog open={openProviderID} onClose={() => setOpenProviderID('')} onAdd={submitProviderEvent} />
                    {state.pricing.map((item, index) => {
                        return (
                            <div key={item.id} className="relative z-0" onMouseEnter={() => setHoverIndex(index)} onMouseLeave={() => setHoverIndex(-1)}>
                                <RemoveItemButton onClick={() => { setRemoveOrderID(item.id); }} addClass={`absolute left-0 top-2 transform -translate-y-1/2 z-20 ${hoverIndex === index ? "" : "hidden"}`} />
                                <ItemTableRowDisplay
                                    itemID={item.id}
                                    pos={index + 1}
                                    hashtagEvent={hashtagOnclick}
                                    providerEvent={()=>{ setOpenProviderID(item.id)}} />
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="flex gap-x-4">
                <AddRowButton onClick={addRowEvent} />
                <AddOldItemButton onClick={() => { }} />
            </div>
        </div>
    );
};

export default ItemTableTemplate;