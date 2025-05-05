import { useSelector, useDispatch } from "react-redux";
import { setCustomers } from "../../../../../../../../redux/cardsSlice";
import RightDeleteContainer from "../../../../../../common/RightDeleteContainer";
import Messages from "../../../../../../common/Messages";

const CustomerDeleteForm = ({ custState, callback}) => {
    const dispatch = useDispatch();
    const customers = useSelector(state => state.cards.customers);

    // Hide the delete dialog
    const setStateHandler = () => {
        callback&&callback(false);
    };

    // call when the user confirm to delete
    const deleteCallback = () => {
        const nCustomers = customers.filter(c => c.id !== custState.currentObjects[0].id);
        dispatch(setCustomers(nCustomers));
        callback&&callback(false);
    }

    return(
        <RightDeleteContainer state={custState} setState={setStateHandler} callback={deleteCallback}
            headerContent={<h1 className="text-[18px]"><strong>Xóa sản phẩm, hìn ảnh minh họa</strong></h1>}
            children={
                <div>
                    <Messages type="CertRemoveMessage" />
                </div>
            } />
    );
}

export default CustomerDeleteForm;