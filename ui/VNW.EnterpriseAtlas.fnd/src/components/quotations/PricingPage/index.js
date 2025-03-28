import { useEffect, useState, useReducer } from 'react';
import { useTranslation } from 'react-i18next';
import { Tooltip } from 'react-tooltip';
import RFQItemOrderProvider from '../../../contexts/RFQItemOrder';
import { ROFReducer, initialOrder, orderItemTemplate } from '../../../reducers/ROFReducer';
import OrderInformation from './OrderInfomation';
import OrderItemList from './OrderItemList';
import ProviderFilter from './ProviderFilter';
import CreateOrderButton from './CreateOrderButton';
import CancelOrderButton from './CancelOrderButton';
import ConfirmDialog from './ComfirmForm';


/**
 * Quotations/PricingPage
 */
const PricingPage = () => {
    const { t } = useTranslation();
    const [orderState, dispatch] = useReducer(ROFReducer, initialOrder);
    const [confirmDialog, setConfirmDialog] = useState(false);

    /**
     * Check if the input field is empty
     * @param {*} value 
     * @param {*} message 
     * @returns 
     */
    const checkValidInputField = (value, message) => {
        if (!value) {
            alert(message);
            return false;
        }
        return true;
    }

    /**
     * Check if the date is valid
     * @param {*} start - start date
     * @param {*} end - end date
     * @returns 
     */
    const checkDateValid = (start, end) => {
        const startDate = new Date(start).toISOString().split("T")[0];
        const endDate = new Date(end).toISOString().split("T")[0];
        const currentDate = new Date().toISOString().split("T")[0];

        if (startDate < currentDate) {
            alert(t("start_date_invalid"));
            return false;
        }

        if (startDate > endDate) {
            alert(t("end_date_invalid"));
            return false;
        }

        return true;
    }
    /**
     * Check before confirm
     * @returns 
     */
    const checkBeforeConfirm = () => {
        if(!checkValidInputField(orderState.general.orderName, t("enter_order_name"))) return false;
        if(!checkValidInputField(orderState.general.orderAddress, t("enter_order_address"))) return false;
        if(!checkValidInputField(orderState.general.orderCreatedAt, t("enter_order_start"))) return false;
        if(!checkValidInputField(orderState.general.orderDueDate, t("enter_order_end"))) return false;
        
        if(!checkDateValid(orderState.general.orderCreatedAt, orderState.general.orderDueDate)) return false;
        
        
        // Check items in pricing
        const check = orderState.pricing.some((item, index) => {
            if (!checkValidInputField(item.itemName, `Item ${index+1}: ${t("enter_item_name")}`)) return true;
            if (!checkValidInputField(item.quantity, `Item ${index+1}: ${t("enter_quantity")}`)) return true;
            if (!checkValidInputField(item.unit, `Item ${index+1}: ${t("enter_unit")}`)) return true;
        });
        return !check;
    }

    /**
     * Raise when the create order button is clicked
     */
    const onSubmit = () => {
        const check = checkBeforeConfirm();
        if (check)
            setConfirmDialog(true);
    }

    return (
        <div className="fixed inset-0 top-14 flex justify-center items-start z-50">
            <div className="relative border bg-white w-[90vw] max-w-6xl h-[calc(100vh-60px)] flex flex-col">
                <label className="text-2xl font-bold mt-3 mx-3">{t("create_auto_rfq")}</label>
                <hr className="w-full border-t-2 border-gray-300 my-2" />
                <div className="flex-1 overflow-y-auto overflow-x-auto">
                    <div className='flex flex-col items-start justify-start gap-y-3'>
                        <Tooltip
                            id="pricing-tooltip"
                            place="bottom"
                            noArrow={false}
                            className="z-30 bg-[rgb(196,196,196)] text-[6px]"
                            style={{ backgroundColor: "rgb(196,196,196)", color: "#222", fontSize: "12px" }}
                            delayShow={300}
                        />
                        <RFQItemOrderProvider state={orderState} dispatch={dispatch} orderItem={orderItemTemplate}>
                            <OrderInformation />
                            <OrderItemList />
                            <ProviderFilter />
                            {confirmDialog && <ConfirmDialog onClose={() => setConfirmDialog(false)} />}
                        </RFQItemOrderProvider>
                        <div className="h-52"></div>
                    </div>
                </div>
                <div className="w-full bg-blue-100/70 backdrop-blur-lg p-3">
                    <div className="flex justify-end items-center gap-x-2">
                        {/* <CancelOrderButton /> */}
                        <CreateOrderButton onClick={onSubmit} />
                    </div>
                </div>
            </div>

        </div>
    );
}


export default PricingPage;
