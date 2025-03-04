import { useState, useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { setCustomers } from "../../../../../redux/cardsSlice";
import CustomerCategory from '../../customer_category';
import RightInputContainer from "../../../common/right_input_container";
import InputTemplate from './inputTemplate'
import { nanoid } from '@reduxjs/toolkit';

const IFPartner = () => {
    const dispatch = useDispatch();
    const customers = useSelector(state => state.cards.customers);
    const [customer, setCustomer] = useState({});
    const [isDisplayInsertBox, setIsDisplayInsertBox] = useState(false);

    useEffect(() => {
        if(isDisplayInsertBox){
            setCustomer({
                custName:"",
                taxcode:"",
                custLogo:"",
                custAddress:"",
                id: nanoid()})
        }
    }, [isDisplayInsertBox])
           

    const saveButtonClick = () => {
        const existObj = customers.manual.find(c => c.id === customer.id);
        if (existObj) {
            const nCustomers = [...customers.manual];
            const index = nCustomers.findIndex(c => c.id === customer.id);
            nCustomers[index] = customer;

            dispatch(setCustomers({
                ...customers,
                manual: nCustomers
            }));
        }
        else{
            dispatch(setCustomers({
                ...customers,
                manual: [...customers.manual, customer]
            }));
        }
    }

    return (
        <div>
            <CustomerCategory callback={setIsDisplayInsertBox}/>
            {isDisplayInsertBox&&
            <RightInputContainer closeCallback={setIsDisplayInsertBox} saveCallback={saveButtonClick} children={<InputTemplate object={customer} callback={setCustomer}/>} />}
        </div>
    );
};

export default IFPartner;