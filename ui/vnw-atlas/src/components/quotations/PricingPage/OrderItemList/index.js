import ItemTableTemplate from "./ItemTableTemplate";
import HeaderDisplay from "../../common/HeaderDisplay";
import FileAttachmentButton from "../../common/FileAttachmentButton";
import { useAppContext } from "../../../../contexts/RFQItemOrder";
import { useTranslations } from "next-intl";

/**
 * Display the list of order items
 * @param {*} param0 
 * @returns 
 */
const OrderItemList = () => {
    const t = useTranslations('trans');
    const { state, dispatch, orderItem } = useAppContext();

    const fileAttachmentOnChange = (file) => {
        dispatch({ type: 'SET_ORDER_FILE', payload: file });
    }

    return (
        <div className="p-3 space-y-3">
            <div className="flex justify-start items-center gap-x-3">
                <HeaderDisplay title={t("order_items")}/>
                <FileAttachmentButton fileName={state.fileAttachment?.name} onChange={fileAttachmentOnChange}/>
            </div>
            <ItemTableTemplate />
        </div>
    );
};

export default OrderItemList;