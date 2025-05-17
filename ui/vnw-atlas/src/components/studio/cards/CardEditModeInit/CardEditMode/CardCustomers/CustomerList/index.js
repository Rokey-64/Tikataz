import { useState} from "react";
import { useSelector } from "react-redux";
import { MdAddToPhotos } from "react-icons/md";
import CustomerDisplay from "./CustomerDisplay";
import InsertNoticeText from "../../../../../common/InsertNoticeText";
import AboveInsertedButton from "../../../../../common/AboveInsertedButton";
import CustomerDeleteForm from "./CustomerDeleteForm";
import { useTranslations } from "next-intl";

/**
 * Display the list of customers
 * @param {*} param0 
 * @returns 
 */
const CustomerList = ({ callback }) => {
    const t = useTranslations('trans');
    const customers = useSelector(state => state.cards.customers);
    const [state, setState] = useState({
        status: false,
        currentObjects: []
    });
    
    /**
     ** Add a new customer to the list
     */
    const addCustomerOnClick = () => {
        callback && callback(true);
    };

    const delCustomerHandler = (customer) =>{
        setState({...state, status: true, currentObjects: [{name:customer.custName, id: customer.id}]});
    }

    const cancelDelHandler = () =>{
        setState({...state, status: false, currentObjects: []});
    }

    return (
        <div className="my-6 space-y-2 ml-5">
            <AboveInsertedButton callback={addCustomerOnClick} content={t("studio.card.edit.addcust")} options={{ icon: MdAddToPhotos }} />
            <InsertNoticeText header={t("studio.card.edit.ourcust")} content={t("studio.card.edit.ourcustlist")}/>
            <div>
                {customers.map((customer, index) => (
                    <div key={index}>
                        <CustomerDisplay customer={customer} delCallback={delCustomerHandler}/>
                    </div>
                ))}
            </div>
            {state.status && <CustomerDeleteForm custState={state} callback={cancelDelHandler}/>}
        </div>
    );
};

export default CustomerList;