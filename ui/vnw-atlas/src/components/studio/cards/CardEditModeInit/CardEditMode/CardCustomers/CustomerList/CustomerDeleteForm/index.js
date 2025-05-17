import { useSelector, useDispatch } from "react-redux";
import { setCustomers } from "@/redux/cardsSlice";
import RightDeleteContainer from "@/components/studio/common/RightDeleteContainer";
import Messages from "@/components/studio/common/Messages";
import { useTranslations } from "next-intl";

const CustomerDeleteForm = ({ custState, callback }) => {
    const t = useTranslations('trans');

    const dispatch = useDispatch();
    const customers = useSelector(state => state.cards.customers);

    // Hide the delete dialog
    const setStateHandler = () => {
        callback && callback(false);
    };

    // call when the user confirm to delete
    const deleteCallback = () => {
        const nCustomers = customers.filter(c => c.id !== custState.currentObjects[0].id);
        dispatch(setCustomers(nCustomers));
        callback && callback(false);
    }

    return (
        <RightDeleteContainer state={custState} setState={setStateHandler} callback={deleteCallback}
            headerContent={<h1 className="text-[18px]"><strong>{t("studio.card.edit.delprod")}</strong></h1>}>
            <div>
                <Messages type="CertRemoveMessage" />
            </div>
        </RightDeleteContainer>
    );
}

export default CustomerDeleteForm;