import { useState, useEffect, useCallback} from "react";
import { useSelector, useDispatch } from "react-redux";
import { setGeneral } from "../../../../../../../redux/cardsSlice";
import InsertNoticeText from "../../../../../common/InsertNoticeText";
import TextSingleInput from "../../../../../common/TextSingleInput";
import TextAreaInput from "../../../../../common/TextAreaInput";
import debounce from "lodash.debounce";

/**
 * This component contains the business category and keywords of the company
 * @returns 
 */
const BussinessMajor = () => {
    const dispatch = useDispatch();
    const general = useSelector(state => state.cards.general);
    const [business, setBusiness] = useState({
        businessField: '',
        keywords: ''
    });

    useEffect(() => {
        setBusiness({
            businessField: general.businessField,
            keywords: general.keywords
        });
    }, [general]);

    const debouncedBusiness = useCallback(debounce((general, key, value) => {
        dispatch(setGeneral({
            ...general,
            [key]: value
            }));
    }, 500), []);


    const callback = (general, key, value) => {
        debouncedBusiness(general, key, value);
        setBusiness({
            ...business,
            [key]: value
        });
    };

    return (
        <>
            <div className="col-span-2 mt-2 max-w-[700px]">
                <InsertNoticeText
                    header="Hạng mục kinh doanh"
                    content="* Để giúp công cụ có thể liên kết thẻ của bạn với các khách hàng cách phù hợp nhất, hãy cung cấp cho chúng tôi thêm thông tin về lĩnh vực 
                            kinh doanh của bạn."
                />
            </div>

            <div className="col-span-2">
                <TextSingleInput title="Lĩnh vực" 
                type="text" 
                content={business.businessField}
                callback={callback.bind(this, general, 'businessField')}
                maxlength={200}/>
            </div>
            <div className="col-span-2">
                <TextAreaInput title="Từ khóa"
                    content={business.keywords}
                    callback={callback.bind(this, general, 'keywords')}
                    maxlength={300}
                    placeholder={"Nhập một số từ khóa để các công cụ tìm kiếm có thể nhận biết bạn."} />
            </div>
        </>
    );
};

export default BussinessMajor;