import { useState, useEffect} from "react";
import { useSelector } from "react-redux";
import InsertCustomer from "../insert_customer/index";
import { MdAddToPhotos } from "react-icons/md";
import InsertNoticeText from "../../insert_notice/index";
import AboveInsertedButton from "../../common/above_inserted_button";
import RemoveCustDialog from "./removeCustDialog";


const CustomerCategory = ({ callback }) => {
    const customers = useSelector(state => state.cards.customers.manual);
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
        <div className="my-6  space-y-2">
            <AboveInsertedButton callback={addCustomerOnClick} content="Thêm khách hàng" options={{ icon: MdAddToPhotos }} />
            <InsertNoticeText header="Khách hàng của chúng tôi" content="Danh sách khách hàng của chúng tôi" />
            <div>
                {customers.map((customer, index) => (
                    <div key={index}>
                        <InsertCustomer customer={customer} delCallback={delCustomerHandler}/>
                    </div>
                ))}
            </div>
            {state.status && <RemoveCustDialog custState={state} callback={cancelDelHandler}/>}
        </div>
    );
};

export default CustomerCategory;