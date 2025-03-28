import { useCallback} from "react";
import ItemImage from "./ItemImage";
import CellInputBox from "../../../../../common/CellInputBox";
import { useAppContext } from "../../../../../../../contexts/RFQItemOrder";
import { debounce } from "lodash";
import _ from "lodash";
/**
 * Display the product content like image and name
 * @param {*} param0 
 * @returns 
 */
const ProductArea = ({ item }) => {
    const { state, dispatch, orderItem } = useAppContext();

    /**
     * Raise an event when the order item changes
     * 
     * @param {*} state - the current state
     * @param {*} item - the item to be changed
     * @param {*} key - the key of the item to be changed
     * @param {*} value - the value of the item to be changeds
     */
    const orderItemChange = useCallback(debounce((state, item, key, value) => {
        const cloneOrderItem = _.cloneDeep(state.pricing);

        // Update the item
        const itemIndex = state.pricing.findIndex((obj) => obj.id === item.id);
        if (itemIndex === -1) return;
        else {
            cloneOrderItem[itemIndex] = { ...cloneOrderItem[itemIndex], [key]: value };
        }

        // Update the state
        dispatch({ type: 'SET_ORDER_ITEM', payload: cloneOrderItem });

    }, 1000
    ), [])

    /**
     * Event handler for image on click
     * @param {*} url 
     * @returns 
     */
    const setImgOnclick = (url) => {
        orderItemChange(state, item, 'itemImage', url);
    }

    /**
     * Event handler for item name on change
     * @param {*} name 
     */
    const itemNameOnChange = (name) => {
        orderItemChange(state, item, 'itemName', name);
    }


    return (
        <div className="flex justify-start items-center rounded-md gap-x-3">
            <ItemImage url={item.itemImage} onClick={setImgOnclick} />
            <div className="flex flex-col gap-y-1 items-start justify-start">
                {/* <ItemName /> */}
                <div className="min-w-[205px]">
                    <CellInputBox title="Tên sản phẩm" value={item.itemName} onChange={itemNameOnChange} />
                </div>
            </div>
        </div>
    );
};

export default ProductArea;