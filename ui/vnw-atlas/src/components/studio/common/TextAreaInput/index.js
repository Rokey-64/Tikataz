import { useState } from "react";

const TextAreaInput = ({title, content, placeholder, maxLengh, callback}) => {
    const [isLimit, setIsLimit] = useState(false);

    const onChange = (e) => {  
        const value = e.target.value;

        // Whether or not to limit the number of characters
        if (maxLengh && value.length >= maxLengh) {
            setIsLimit(true);
            return;
        }
        else {
            setIsLimit(false);
            callback&&callback(value);
        }
    }

    return (
        <>
            <label className="flex items-center mb-1 font-semibold text-[14px]">
                {title}
                <span className="ml-2 text-blue-500 cursor-pointer flex justify-center items-center w-4 h-4 border rounded-full border-blue-500 text-[10px]">
                    ?
                </span>
                {isLimit && <p className="text-red-500 text-[12px] ml-5 font-sans">(Vượt quá số ký tự tối đa là {maxLengh} ký tự)</p>}
            </label>
            <textarea
                name="expirationDate"
                className="w-full px-3 py-1 border rounded focus:outline-blue-400 resize-none text-[14px] text-[#747474]"
                rows="4"
                placeholder={placeholder}
                onChange={onChange}
                value={content}
                maxLength={maxLengh}
            ></textarea>
        </>
    );
};

export default TextAreaInput;
