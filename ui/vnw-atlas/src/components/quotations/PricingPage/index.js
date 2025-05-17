import { useRef, useEffect, useState, useReducer, Suspense} from 'react';
import { useTranslations } from "next-intl";
import { Tooltip } from 'react-tooltip';
import RFQItemOrderProvider from '../../../contexts/RFQItemOrder';
import { ROFReducer, initialOrder, orderItemTemplate } from '../../../reducers/ROFReducer';
import OrderInformation from './OrderInfomation';
import OrderItemList from './OrderItemList';
import ProviderFilter from './ProviderFilter';
import CreateOrderButton from './CreateOrderButton';
import CancelOrderButton from './CancelOrderButton';
import ConfirmDialog from '../common/ComfirmForm';
import { useSearchParams, useRouter } from 'next/navigation';
import checkRFQValidIDAPI from '@/api/checkRFQValidID';


/**
 * Quotations/PricingPage
 */
const PricingPage = () => {
    const t = useTranslations('trans');
    const [orderState, dispatch] = useReducer(ROFReducer, initialOrder);
    const [confirmDialog, setConfirmDialog] = useState(false);
    const router = useRouter();
    const didFetchRef = useRef(false);
    const searchParams = useSearchParams();

    useEffect(() => {
        // alert("check order id");
        /**
         * Get the order ID from the URL query parameters
         */
        const orderId = searchParams.get("id");
        if (!orderId) {
            router.push(`/rfq/dashboard`);
            return;
        }

        if (didFetchRef.current) {
            return;
        }
        didFetchRef.current = true;

        /**
         * This function wil Check whether the order ID is valid or not
         * @param {*} orderId 
         * @returns 
         */
        const checkOrderID = async (orderId) => {
            const response = await checkRFQValidIDAPI(orderId);
            if (response) {
                const data = response.data.payload;

                /**
                 * Check if user profile is valid
                 */
                if (!data.org || !data.tax) {
                    const shouldCancel = window.confirm(t("user_profile_required"));
                    if (shouldCancel) {
                        return router.push("/me/general?tab=info");
                        
                    }
                    return router.push(`/rfq/dashboard`);
                }

                dispatch({
                    type: "SET_ORDER_PROFILE", payload: {
                        id: orderId,
                        profile: {
                            org: data.org,
                            tax: data.tax
                        },
                        address: data.addr

                    }
                });
            } else {
                router.push(`/rfq/dashboard`);
                return false;
            }
        };
        checkOrderID(orderId);

        /**
         * If the user tries to leave the page, show a confirmation dialog
         * @param {*} event 
         */
        if(process.env.NEXT_PUBLIC_ENV === "production"){
            const handleBeforeUnload = (event) => {
                event.preventDefault();
            };
    
            window.addEventListener("beforeunload", handleBeforeUnload);
            return () => {
                window.removeEventListener("beforeunload", handleBeforeUnload);
            };
        }
    }, []);

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
        if (!checkValidInputField(orderState.general.orderName, t("enter_order_name"))) return false;
        if (!checkValidInputField(orderState.general.orderAddress, t("enter_order_address"))) return false;
        if (!checkValidInputField(orderState.general.orderCreatedAt, t("enter_order_start"))) return false;
        if (!checkValidInputField(orderState.general.orderDueDate, t("enter_order_end"))) return false;

        if (!checkDateValid(orderState.general.orderCreatedAt, orderState.general.orderDueDate)) return false;


        // Check items in pricing
        const check = orderState.pricing.some((item, index) => {
            if (!checkValidInputField(item.itemName, `Item ${index + 1}: ${t("enter_item_name")}`)) return true;
            if (!checkValidInputField(item.quantity, `Item ${index + 1}: ${t("enter_quantity")}`)) return true;
            if (!checkValidInputField(item.unit, `Item ${index + 1}: ${t("enter_unit")}`)) return true;
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
        <div className="fixed inset-0 top-[6.5rem] md:top-[68px] flex justify-center items-start z-50">
            <div className="relative border bg-white w-[90vw] max-w-6xl h-[calc(100vh-100px)] md:h-[calc(100vh-70px)] flex flex-col">
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
                            <ConfirmDialog open={confirmDialog} onClose={() => setConfirmDialog(false)} />
                        </RFQItemOrderProvider>
                        <div className="h-52"></div>
                    </div>
                </div>
                <div className="w-full bg-blue-100/70 backdrop-blur-lg p-3">
                    <div className="flex justify-end items-center gap-x-2">
                        <CancelOrderButton />
                        <CreateOrderButton onClick={onSubmit} />
                    </div>
                </div>
            </div>

        </div>
    );
}


const PricingPagelSuspense = () => (
    <Suspense fallback={<div className="w-screen h-screen flex justify-center items-center"><h1 className="text-2xl font-bold">Loading...</h1></div>}>
        <PricingPage />
    </Suspense>
);

export default PricingPagelSuspense;
