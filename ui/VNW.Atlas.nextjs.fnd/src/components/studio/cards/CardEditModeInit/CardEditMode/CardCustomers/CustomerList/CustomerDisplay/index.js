import { useState } from "react";
import CustomerItemDisplay from "./CustomerItemDisplay";
import CustomerAvatar from "./CustomerAvatar";
import CustomerDeleleButton from "./CustomerDeleleButton";

/**
 * the component to insert a new customer
 * @param {*} param0 
 * @returns 
 */
const CustomerDisplay = ({ customer, delCallback}) => {
    const [showRemoveButton, setShowRemoveButton] = useState(false);

    const delCustomerHandler = ()=>{
        delCallback(customer);
    }
    
    return (
        <div className="flex items-center my-2" onMouseEnter={() => setShowRemoveButton(true)} onMouseLeave={() => setShowRemoveButton(false)}>
            <div className="relative bg-gray-100 rounded-md m-4" >
                <CustomerAvatar avatar={customer.custLogo} display={showRemoveButton}/>
                {showRemoveButton && <CustomerDeleleButton callback={delCustomerHandler}/>}
            </div>
            <div >

                <CustomerItemDisplay title="Tên khách hàng:" content={customer.custName} />
                <CustomerItemDisplay title="Mã số thuế:" content={customer.taxcode} />
                <CustomerItemDisplay title="Địa chỉ:" content={customer.custAddress} />
            </div>
        </div>
    );
};

export default CustomerDisplay;
