import { useState } from "react";

/**
 * This component is used to create a text input field as a multip text input
 * @param {function} callback - callback function to handle the input value
 * @param {string} defaultValue - default value for the input
 * @param {object} options - options for the input
 */
const ElementMultipText = ({ callback, defaultValue, options:{text="", holder=""}}) => {
    const [inputValue, setInputValue] = useState(defaultValue);

    /**
     * Responsible for handling the input value
     * @param {*} e 
     */
    const onChange = (e) => {
        callback&&callback(e.target.value)
        setInputValue(e.target.value)
    }

    return (
        <div className="element-multip-text">
            <>
                <label className="block text-gray-700 font-thin text-[14px] underline">
                    {text}
                </label>
                <textarea
                    className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-1
                 focus:ring-blue-500 focus:border-blue-500 px-2 text-[14px] bg-[#ffffff] outline-none"
                    rows={4}
                    placeholder={holder}
                    onChange={onChange}
                    value={inputValue}
                />
            </>
        </div>
    );
};

export default ElementMultipText