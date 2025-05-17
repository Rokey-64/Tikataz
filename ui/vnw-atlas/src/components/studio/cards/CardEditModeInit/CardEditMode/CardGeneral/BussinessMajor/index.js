import { useState, useEffect, useCallback} from "react";
import { useSelector, useDispatch } from "react-redux";
import { setGeneral } from "@/redux/cardsSlice";
import InsertNoticeText from "@/components/studio/common/InsertNoticeText";
import TextSingleInput from "@/components/studio/common/TextSingleInput";
import TextAreaInput from "@/components/studio/common/TextAreaInput";
import debounce from "lodash.debounce";
import { useTranslations } from "next-intl";

/**
 * This component contains the business category and keywords of the company
 * @returns 
 */
const BussinessMajor = () => {
    const t = useTranslations("trans");
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
                    header={t("studio.card.gen.bzzcatg")}
                    content={t("studio.card.gen.bzzcontent")}
                />
            </div>

            <div className="col-span-2">
                <TextSingleInput title={t("studio.card.gen.bzzfield")}
                type="text" 
                content={business.businessField}
                callback={callback.bind(this, general, 'businessField')}
                maxlength={200}/>
            </div>
            <div className="col-span-2">
                <TextAreaInput title={t("studio.card.gen.keywords")}
                    content={business.keywords}
                    callback={callback.bind(this, general, 'keywords')}
                    maxlength={300}
                    placeholder={t("studio.card.gen.m4")}/>
            </div>
        </>
    );
};

export default BussinessMajor;