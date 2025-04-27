import { useState } from "react";

/**
 * This component is used to create a select box as a element select box
 * @param {*} callback - callback function to handle the input value
 * @param {*} defaultValue - default value for the input
 * @param {*} collection - collection of the select box
 * @param {*} options - options for the input 
 * @returns 
 */
const ElementSelectBox = ({ callback, defaultValue, collection, options: { text = "", holder = "" } }) => {

    const [inputValue, setInputValue] = useState(defaultValue);

    /**
     * Responsible for handling the input value
     * @param {*} e 
     */
    const onChange = (e) => {
        callback && callback(e.target.selectedOptions[0].text, e.target.value)
        setInputValue(e.target.value)
    }

    return (
        <div className="element-multip-text">
            <label className="block text-gray-700 font-thin text-[14px] underline">
                {text}
            </label>
            <select className="mt-1 w-full min-w-44 h-5 border-gray-300 rounded-sm shadow-sm focus:ring-1
                 focus:ring-blue-500 focus:border-blue-500 px-2 text-[14px] bg-[#ffffff] outline-none" onChange={onChange} value={inputValue}>
                {collection && collection.map((item, index) => {
                    return (
                        <option key={item.id} value={item.id} selected={item.id === defaultValue}>
                            {item.nation_name}
                        </option>
                    )
                })}
            </select>
        </div>
    );
};

export default ElementSelectBox