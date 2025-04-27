import { useState, useEffect} from "react";

const ElementSingleText = ({ callback, defaultValue, options: { text = "", holder = "", type = "text", isRequired = false, limmit = 500} }) => {
    const [inputValue, setInputValue] = useState(defaultValue);
    const [error, setError] = useState("");
    const [isLimit, setIsLimit] = useState(false);

    // If the field is required, check if the field is empty
    const checkError = (value) => {
        if (isRequired && !value.trim()) {
            setError("This field is required");
        } else {
            setError("");
        }
    };

    /** Initial */
    useEffect(() => {
        checkError(inputValue);
    }, []);

    const onChange = (e) => {
        const value = e.target.value;

        // Whether or not to limit the number of characters
        if (limmit && value.length > limmit) {
            setIsLimit(true);
            return;
        }

        setInputValue(value);
        callback&&callback(value);

        checkError(value);
    };

    return (
        <>
            <label className="block text-gray-700 text-[14px] underline font-sans">{text}</label>
            <input
                type={type}
                onChange={onChange}
                value={inputValue}
                className={`mt-1 w-full rounded-sm shadow-sm focus:ring-1 font-sans px-2 text-[14px] bg-white outline-none 
                    ${isRequired && error ? "focus:ring-red-500 border-red-500 border" : "focus:border-blue-500 "}`}
                placeholder={holder}
            />
            {isRequired && error && <p className="text-red-500 text-[12px] mt-1 font-sans">{error}</p>}
            {isLimit && <p className="text-red-500 text-[12px] mt-1 font-sans">Số ký tự tối đa là {limmit} ký tự</p>}
        </>
    );
};

export default ElementSingleText;
