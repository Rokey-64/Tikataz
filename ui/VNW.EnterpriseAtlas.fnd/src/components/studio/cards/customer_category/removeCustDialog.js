
import { useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCustomers } from "../../../../redux/cardsSlice";
import RightDeleteContainer from "../../common/right_delete_container";
import CardMessages from "../../common/messages";

const RemoveCustDialog = ({ custState, callback}) => {
    console.log(custState);
    const dispatch = useDispatch();
    const customers = useSelector(state => state.cards.customers);

    // Hide the delete dialog
    const setStateHandler = () => {
        callback&&callback(false);
    };

    // call when the user confirm to delete
    const deleteCallback = () => {
        const nCustomers = customers.manual.filter(c => c.id !== custState.currentObjects[0].id);
        dispatch(setCustomers({
            ...customers,
            manual: nCustomers
        }));
        callback&&callback(false);
    }

    return(
        <RightDeleteContainer state={custState} setState={setStateHandler} callback={deleteCallback}
            headerContent={<h1 className="text-[18px]"><strong>Xóa sản phẩm, hìn ảnh minh họa</strong></h1>}
            children={
                <div>
                    <CardMessages type="CertRemoveMessage" />
                </div>
            } />
    );
}

export default RemoveCustDialog;