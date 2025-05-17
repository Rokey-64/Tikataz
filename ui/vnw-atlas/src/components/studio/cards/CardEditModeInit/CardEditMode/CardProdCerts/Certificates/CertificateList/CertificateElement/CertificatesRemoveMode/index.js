import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCerts } from "@/redux/cardsSlice";
import RightDeleteContainer from "@/components/studio/common/RightDeleteContainer";
import Messages from "@/components/studio/common/Messages";

const CertificatesRemoveMode = ({ cert, callback }) => {
    const t = useTranslations('trans'); 
    const dispatch = useDispatch();
    const certs = useSelector(state => state.cards.certificates);
    const [state, setState] = useState({
        status: false,
        currentObjects: []
    });

    // Set delete object when cert is available
    useEffect(() => {
        if (cert) {
            setState({
                status: true,
                currentObjects: [{ name: cert.certype, id: cert.id }]
            });
        }
    }, [cert]);


    // Hide the delete dialog
    const setStateHandler = (status) => {
        setState({ ...state, status: status });
        callback && callback(false);
    };

    // call when the user confirm to delete
    const deleteCallback = () => {
        const newCerts = certs.filter(c => c.id !== cert.id);
        dispatch(setCerts(newCerts));
    }

    return (
        <RightDeleteContainer state={state} setState={setStateHandler} callback={deleteCallback}
            headerContent={<h1 className="text-[18px]"><strong>{t("studio.card.cert.delprod")}</strong></h1>}>
            <div>
                <Messages type="CertRemoveMessage" />
            </div>
        </RightDeleteContainer>
    );
}

export default CertificatesRemoveMode;