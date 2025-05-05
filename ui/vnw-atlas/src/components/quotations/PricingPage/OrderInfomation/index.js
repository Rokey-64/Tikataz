import {useState, useContext, useEffect} from 'react';
import { useAppContext } from '../../../../contexts/RFQItemOrder';
import OrderInput from '../../common/OrderInput';
import HeaderDisplay from "../../common/HeaderDisplay";
import OrderTextArea from "../../common/OrderTextArea";
import Messages from "../../common/Messages";
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

/**
 * Display the order information panel
 * @param {*} param0 
 */
const OrderInformation = () => {
    const { t } = useTranslation();
    const {state, dispatch} = useAppContext();
    const [orderGeneral, setOrderGeneral] = useState(state.general);

    useEffect(() => {
        setOrderGeneral(state.general);
    }, [state.general]);

    /**
     * Event handler for the input change
     * @param {*} key 
     * @param {*} value 
     */
    const onChange = (key, value) => {
        setOrderGeneral(prev => {
            const updatedOrder = { ...prev, [key]: value };
            dispatch({
                type: 'SET_ORDER_GENERAL',
                payload: updatedOrder
            });
            return updatedOrder;
        });
    }

    return (
        <div className="p-3 space-y-3">
            <HeaderDisplay title={t("order_info")}/>
            <Messages type="AutRFQGenerMessage" />
            <div className='flex items-start justify-start mt-3 space-x-2 opacity-90 hover:opacity-100'>
                <div className='space-y-3 min-w-[300px]'>
                    <OrderInput title={t("order_name")} type="text" value={orderGeneral.orderName} onChange={onChange.bind(this, "orderName")} maxLength={200}/>
                    <OrderInput title={t("order_created_date")} type="date" value={orderGeneral.orderCreatedAt} onChange={onChange.bind(this, "orderCreatedAt")} />
                    <OrderInput title={t("order_deadline")} type="date" value={orderGeneral.orderDueDate} onChange={onChange.bind(this, "orderDueDate")} />
                </div>
                <div className='space-y-3 min-w-[300px]'>
                    <OrderTextArea title={t("order_address")} value={orderGeneral.orderAddress} onChange={onChange.bind(this, "orderAddress")} maxLength={300}/>
                    <OrderTextArea title={t("order_remark")} value={orderGeneral.orderRemark} onChange={onChange.bind(this, "orderRemark")}  maxLength={300}/>
                </div>
            </div>
        </div>
    );
};

export default OrderInformation;
