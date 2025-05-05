import { useState } from "react";

/**
 * Display a one line input field with a label that can be used in card components
 * @param {*} options 
 * { title, type, maxlength, content, callback} 
 * @returns 
 */
const TextSingleInput = (options) => {
    const [isLimit, setIsLimit] = useState(false);


    const onChange = (e) => {
        const value = e.target.value;

        // Whether or not to limit the number of characters
        if (options.maxlength && value.length >= options.maxlength) {
            setIsLimit(true);
            return;
        }
        else {
            setIsLimit(false);
            options.callback && options.callback(value);
        }
    };

    const displayWarms = () =>{
        if(options.isRequire && !options.content){
            return <p className="text-red-500 text-[12px] ml-5 font-sans">(Trường này không được để trống)</p>;
        }
        else if(isLimit){
            return <p className="text-red-500 text-[12px] ml-5 font-sans">(Vượt quá số ký tự tối đa là {options.maxlength} ký tự)</p>;
        }
    };

    return (
        <div>
            <label className="flex items-center mb-1 font-semibold text-[14px]">
                {
                    options.imgsrc && (<img src={options.imgsrc} alt="asterisk" className="w-4 h-4 mr-1 mb-1" />)
                }
                {options.title}
                <span className="flex justify-center items-center w-4 h-4 ml-2 text-blue-500 cursor-pointer border rounded-full border-blue-500 text-[10px]">
                    ?
                </span>
                {displayWarms()}
            </label>
            <input
                type={options.type}
                onChange={onChange}
                value={options.content}
                name="expirationDate"
                className={
                    `w-full px-3 py-2 border rounded text-[14px] text-[#555555] ${options.isRequire && !options.content ? 'border-red-500 focus:outline-red-400 ' : 'border-[#E0E0E0] focus:outline-blue-400 '}`
                }
                maxLength={options.maxlengtht}
            />
        </div>
    );
};

export default TextSingleInput;