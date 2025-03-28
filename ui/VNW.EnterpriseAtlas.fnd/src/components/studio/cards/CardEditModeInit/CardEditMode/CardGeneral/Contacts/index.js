import { useState, useEffect, useCallback} from "react";
import { useSelector, useDispatch } from "react-redux";
import { setGeneral } from "../../../../../../../redux/cardsSlice";
import InsertNoticeText from "../../../../../common/InsertNoticeText";
import TextSingleInput from "../../../../../common/TextSingleInput";
import debounce from "lodash.debounce";

/**
 * This component is used to get the contact information of a company
 * @returns 
 */
const Contacts = () => {
    const dispatch = useDispatch();
    const general = useSelector(state => state.cards.general);
    const [contactInfo, setContactInfo] = useState({
        phone: "",
        email: "",
        fax: "",
        zalo: "",
        website: ""
    });

    useEffect(() => {
        setContactInfo({
            phone: general.phone || "",
            email: general.email || "",
            fax: general.fax || "",
            zalo: general.zalo || "",
            website: general.website || ""
        });
    }, [general]);

    /** Update the contact infomation */
    const debouncedContact = useCallback(debounce((general, key, value) => {
        dispatch(setGeneral({
            ...general,
            [key]: value
        }));
    }, 500), [dispatch]);

    const contactCallback = (general, key, value) => {
        debouncedContact(general, key, value);
        setContactInfo({...contactInfo, [key]: value});
    };


    return (
        <>
            <div className="col-span-2 mt-6 max-w-[700px]">
                <InsertNoticeText
                    header="Chúng tôi sẽ liên lạc với bạn bằng cách nào?"
                    content={
                        <>
                            * Chúng tôi sẽ dựa vào thông tin liên lạc bạn cung cấp để tiến hành liên hệ với bạn bất cứ khi nào cần thực
                            hiện báo giá hoặc xác nhận. Cụ thể như sau:<br />
                            <strong>1. Số điện thoại:</strong> Số điện thoại của bạn sẽ được sử dụng để gọi điện hoặc nhắn tin cho bạn.<br />
                            <strong>2. Email:</strong> Chúng tôi sẽ gửi báo giá thông qua email của bạn<br /><br />

                            * Lưu ý: Nếu bạn không cung cấp thêm, mặc định sẽ lấy thông tin từ hồ sơ của bạn. Vui lòng hoàn tất hồ sơ của bạn.
                        </>
                    }
                />
            </div>
            <div>
                <TextSingleInput title="Số điện thoại" type="text" content={contactInfo.phone} callback={contactCallback.bind(this, general, 'phone')}  isRequire={true} 
                imgsrc="/social/phone.svg"/>
            </div>
            <div>
                <TextSingleInput title="Email" type="text" content={contactInfo.email} callback={contactCallback.bind(this, general, 'email')} isRequire={true}
                imgsrc="/social/email.svg"/>
            </div>
            <div>
                <TextSingleInput title="Fax" type="text" content={contactInfo.fax} callback={contactCallback.bind(this, general, 'fax')}
                imgsrc="/social/fax.svg"/>
            </div>
            <div>
                <TextSingleInput title="Zalo" type="text" content={contactInfo.zalo} callback={contactCallback.bind(this, general, 'zalo')}
                imgsrc="/social/zalo.svg"/>
            </div>
            <div>
                <TextSingleInput title="🌍 Website" type="text" content={contactInfo.website} callback={contactCallback.bind(this, general, 'website')}/>
            </div>
        </>
    );
};

export default Contacts;