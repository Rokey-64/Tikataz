import { useState } from "react";
import Element from "./element";
import CustomerAvatar from "./customerAvatar";
import RemovePartnerButton from "./removePartnerButton";

/**
 * the component to insert a new customer
 * @param {*} param0 
 * @returns 
 */
const InsertCustomer = ({ customer, delCallback}) => {
    const [showRemoveButton, setShowRemoveButton] = useState(false);

    const delCustomerHandler = ()=>{
        delCallback(customer);
    }
    
    return (
        <div className="flex items-center my-2" onMouseEnter={() => setShowRemoveButton(true)} onMouseLeave={() => setShowRemoveButton(false)}>
            <div className="relative bg-gray-100 rounded-md m-4" >
                <CustomerAvatar avatar={customer.custLogo} display={showRemoveButton}/>
                {showRemoveButton && <RemovePartnerButton callback={delCustomerHandler}/>}
            </div>
            <div >

                <Element title="Tên khách hàng:" content={customer.custName} />
                <Element title="Mã số thuế:" content={customer.taxcode} />
                <Element title="Địa chỉ:" content={customer.custAddress} />
            </div>
        </div>
    );
};

export default InsertCustomer;
