import { useState, useEffect, useCallback} from "react";
import { useSelector, useDispatch } from "react-redux";
import { setGeneral } from "@/redux/cardsSlice";
import InsertAddress from "@/components/studio/common/InsertAddress";
import InsertNoticeText from "@/components/studio/common/InsertNoticeText";
import debounce from "lodash.debounce";
import { useTranslations } from "next-intl";

/**
 * This component is used to get the address information of a company
 * @param {*} param0 
 * @returns 
 */
const AddressList = () => {
    const t = useTranslations("trans");
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
                    header={t("studio.card.gen.m1")}
                    content={
                        <>
                            * {t("studio.card.gen.m2")}<br /><br />
                            * {t("studio.card.gen.m3")}
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