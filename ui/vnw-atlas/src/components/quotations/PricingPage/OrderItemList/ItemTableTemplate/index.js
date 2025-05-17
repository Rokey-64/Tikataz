
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
import ItemHistoryDialog from "../../../common/ItemHistoryDialog";
import { useTranslations } from "next-intl";
import { nanoid } from "nanoid";
import _, { set } from "lodash";

/**
 * This component is a template for the item table in the pricing page.
 * @param {*} param0 
 * @returns 
 */
const ItemTableTemplate = () => {
    const t = useTranslations('trans');
    const [hoverIndex, setHoverIndex] = useState(-1);
    const [hashtagCurrID, setHashtagCurrID] = useState('');
    const [openProviderID, setOpenProviderID] = useState('');
    const [orderItemID, setRemoveOrderID] = useState('');
    const [displayItems, setDisplayItems] = useState(false);
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
        if (!item) return "";

        let hashtags = "";
        for (const hashtag of item.hashtag) {
            hashtags += `#${hashtag} `;
        }
        
        return hashtags || "";
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

    /**
     * Generate a new row from the history
     * @param {} item 
     */
    const addRowFromHistory = (filterItems) => {
        if (filterItems.length === 0) return;
        const pricing = _.cloneDeep(state.pricing);

        // If there doesn't have any item, add a new one
        if (pricing.length === 1) {
            if (pricing[0].itemName === ""
                && pricing[0].specification === ""
                && pricing[0].quantity === ""
                && pricing[0].unit === ""
                && pricing[0].description === ""
                && pricing[0].hashtag.length === 0
                && pricing[0].providerCode.length === 0
                && pricing[0].itemImage === ""
            ) {
                pricing.pop();
            }
        }

        // Add the new items to the pricing list
        filterItems.forEach((item) => {
            const cloneOrder = _.cloneDeep(orderItem);
            cloneOrder.id = nanoid();
            cloneOrder.itemName = item.item_name;
            cloneOrder.specification = item.spec;
            cloneOrder.unit = item.unit;
            pricing.push(cloneOrder);
        });
        
        dispatch({ type: 'SET_ORDER_ITEM', payload: pricing });
        setDisplayItems(false);
    }

    return (
        <div className="w-fit">
            <Messages type="AutRFQItemsMessage" />
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
                <AddOldItemButton onClick={() => setDisplayItems(true)} />
            </div>
            <ItemHistoryDialog open={displayItems} onClose={() => setDisplayItems(false)} onAdd={addRowFromHistory} />
        </div>
    );
};

export default ItemTableTemplate;