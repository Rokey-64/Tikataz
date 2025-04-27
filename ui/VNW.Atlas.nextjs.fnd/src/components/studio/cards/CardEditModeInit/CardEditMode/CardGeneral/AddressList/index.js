import { useState, useEffect, useCallback} from "react";
import { useSelector, useDispatch } from "react-redux";
import { setGeneral } from "../../../../../../../redux/cardsSlice";
import InsertAddress from "../../../../../common/InsertAddress";
import InsertNoticeText from "../../../../../common/InsertNoticeText";
import debounce from "lodash.debounce";

/**
 * This component is used to get the address information of a company
 * @param {*} param0 
 * @returns 
 */
const AddressList = () => {
    const dispatch = useDispatch();
    const general = useSelector(state => state.cards.general);
    
    const [addresses, setAddresses] = useState([]);

    useEffect(() => {
        setAddresses(general.address || []);
    }, [general]);
    
    /** Update address */
    const debouncedAddress = useCallback(
        debounce((general, key, value) => {
            dispatch(setGeneral({
                ...general,
                [key]: value
            }));
        }, 500)
        , [dispatch]);

    const callback = (general, key, value) => {
        debouncedAddress(general, key, value);
        setAddresses(value);
    };

    return (
        <>
            <div className="col-span-2 mt-2 max-w-[700px]">
                <InsertNoticeText
                    header="Cung cấp cho chúng tôi địa chỉ của bạn"
                    content={
                        <>
                            * Thông tin về địa chỉ sẽ được sử dụng để xác định vị trí của bạn, giúp chúng tôi có thể đưa tới khách hàng tiềm
                            năng quanh khu vực đó.<br /><br />
                            * Bạn có thể cung cấp một hoặc nhiều địa chỉ cụ thể hoặc phạm vi hoạt động của bạn.
                        </>
                    }
                />
            </div>

            <div className="col-span-2">
                <InsertAddress 
                addresses={addresses} 
                callback={callback.bind(this, general, 'address')}
                isRequired={true}/>
            </div>
        </>
    );
};

export default AddressList;