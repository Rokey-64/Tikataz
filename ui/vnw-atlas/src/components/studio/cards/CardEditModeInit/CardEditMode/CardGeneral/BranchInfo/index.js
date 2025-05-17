import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setGeneral } from "@/redux/cardsSlice";
import InsertLogo from "@/components/studio/common/InsertLogo";
import TextSingleInput from "@/components/studio/common/TextSingleInput";
import TextAreaInput from "@/components/studio/common/TextAreaInput/index";
import debounce from "lodash.debounce";
import { useTranslations } from "next-intl";

/**
 * This component contains the name and introduction of the company
 * @returns 
 */
const BranchInfo = () => {
    const t = useTranslations("trans");
    const dispatch = useDispatch();
    const general = useSelector(state => state.cards.general);
    const [header, setHeader] = useState({
        branchName: '',
        description: '',
        logoBlob: ''
    });

    /** init value */
    useEffect(() => {
        setHeader({
            branchName: general.branchName,
            description: general.description,
            logo: general.logo
        });
    }, [general]);

    /** Update branch name */
    const debouncedHeader = useCallback(debounce((general, key, value) => {
        dispatch(setGeneral({
            ...general,
            [key]: value
        }));
    }, 1000), []);

    const callback = (general, key, value) => {
        debouncedHeader(general, key, value);
        setHeader({
            ...header,
            [key]: value
        });
    }

    return (
        <div className="flex items-start  mb-6">
            <InsertLogo logoPath={header.logo} callback={callback.bind(this, general, 'logo')} />
            <div className="w-full">
                <div>
                    <TextSingleInput title={t("studio.card.gen.brandname")}
                        type="text"
                        maxlength={40}
                        content={header.branchName}
                        callback={callback.bind(this, general, 'branchName')}
                        isRequire={true}/>
                </div>
                <div className="mt-4 min-w-[500px]">
                    <TextAreaInput title={t("studio.card.gen.intro")}
                    type="text" 
                    maxlength={200} 
                    content={header.description} 
                    callback={callback.bind(this, general, 'description')} />
                </div>
            </div>
        </div>
    );
};

export default BranchInfo;