import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { setCustomers } from "../../../../../../redux/cardsSlice";
import CustomerList from './CustomerList';
import RightInputContainer from "../../../../common/RightInputContainer";
import CustomerInsertForm from './CustomerInsertForm'
import { useTranslations } from "next-intl";

const CardCustomers = () => {
    const t = useTranslations("trans");
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
                alert(t('studio.card.edit.maxcust'));
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
                <div className="fixed top-11 md:top-11 right-0 md:right-[-10px] h-full z-50 w-[400px] bg-white shadow-lg">
                    <div>
                        <RightInputContainer closeCallback={setIsDisplayInsertBox} saveCallback={saveButtonClick}>
                            <CustomerInsertForm object={cust} callback={setCust} />
                        </RightInputContainer>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CardCustomers;