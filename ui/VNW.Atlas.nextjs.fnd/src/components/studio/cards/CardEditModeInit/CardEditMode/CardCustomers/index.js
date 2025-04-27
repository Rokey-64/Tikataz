import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { setCustomers } from "../../../../../../redux/cardsSlice";
import CustomerList from './CustomerList';
import RightInputContainer from "../../../../common/RightInputContainer";
import CustomerInsertForm from './CustomerInsertForm'

const CardCustomers = () => {
    const dispatch = useDispatch();
    const customers = useSelector(state => state.cards.customers);
    const [cust, setCust] = useState({});
    const [isDisplayInsertBox, setIsDisplayInsertBox] = useState(false);

    useEffect(() => {
        if (isDisplayInsertBox) {
            setCust({
                custName: "",
                taxcode: "",
                custLogo: "",
                custAddress: "",
                id: ""
            })
        }
    }, [isDisplayInsertBox])


    const saveButtonClick = () => {
        const existObj = customers.find(c => c.id === cust.id);
        if (existObj) {
            const nCustomers = [...customers];
            const index = nCustomers.findIndex(c => c.id === cust.id);
            nCustomers[index] = cust;

            dispatch(setCustomers(nCustomers));
        }
        else {
            let newCustID = -1;
            for (let i = 1; i < 10; i++) {
                if (!customers.find(c => c.id === i)) {
                    newCustID = i;
                    break;
                }
            }

            if (newCustID === -1) {
                alert("Chỉ có thể thêm tối đa 9 khách hàng ");
                return;
            }
            setCust({ ...cust, id: newCustID });
            dispatch(setCustomers([...customers, { ...cust, id: newCustID }]));
        }
    }

    return (
        <div>
            <CustomerList callback={setIsDisplayInsertBox} />
            {isDisplayInsertBox && (
                <RightInputContainer closeCallback={setIsDisplayInsertBox} saveCallback={saveButtonClick}
                    children={<CustomerInsertForm object={cust} callback={setCust} />} />
            )}
        </div>
    );
};

export default CardCustomers;