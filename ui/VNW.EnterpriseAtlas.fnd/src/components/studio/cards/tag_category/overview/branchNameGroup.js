import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setGeneral } from "../../../../../redux/cardsSlice";
import InsertLogo from "../../insert_logo/insertLogo";
import TextSingleInput from "../../text_single_input";
import TextAreaInput from "../../text_area_input/index";
import debounce from "lodash.debounce";

/**
 * This component contains the name and introduction of the company
 * @returns 
 */
const BranchNameGroup = () => {
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
    }, []);

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
                    <TextSingleInput title="Tên thương hiệu"
                        type="text"
                        maxlength={40}
                        content={header.branchName}
                        callback={callback.bind(this, general, 'branchName')}
                        isRequire={true}/>
                </div>
                <div className="mt-4 min-w-[500px]">
                    <TextAreaInput title="Lời giới thiệu" 
                    type="text" 
                    maxlength={200} 
                    content={header.description} 
                    callback={callback.bind(this, general, 'description')} />
                </div>
            </div>
        </div>
    );
};

export default BranchNameGroup;