import { useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { setProducts } from "../../../../../../redux/cardsSlice";
import RightDeleteContainer from "../../../../common/right_delete_container";
import CardMessages from "../../../../common/messages";

const RemoveCert = ({ cert, callback}) => {
    const dispatch = useDispatch();
    const certs = useSelector(state => state.cards.products);
    const [state, setState] = useState({
        status: false,
        currentObjects: []
    });

    // Set delete object when cert is available
    useEffect(() => {
        if (cert) {
            setState({
                status: true,
                currentObjects: [{name: cert.certype, id: cert.id}]
            });
        }
    }, [cert]);


    // Hide the delete dialog
    const setStateHandler = (status) => {
        setState({...state, status: status});
        callback&&callback(false);
    };

    // call when the user confirm to delete
    const deleteCallback = () => {
        const newCerts = certs.certs.filter(c => c.id !== cert.id);
        dispatch(setProducts({
            ...certs,
            certs: newCerts,
        }));
    }

    return(
        <RightDeleteContainer state={state} setState={setStateHandler} callback={deleteCallback}
            headerContent={<h1 className="text-[18px]"><strong>Xóa sản phẩm, hìn ảnh minh họa</strong></h1>}
            children={
                <div>
                    <CardMessages type="CertRemoveMessage" />
                </div>
            } />
    );
}

export default RemoveCert;