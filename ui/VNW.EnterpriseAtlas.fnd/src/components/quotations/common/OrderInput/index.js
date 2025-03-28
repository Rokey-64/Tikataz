import { useState, useCallback} from "react";
import { debounce } from "lodash";

/**
 * Create a input field for order
 * @param {*} param0 
 * @returns 
 */
const OrderInput = ({ value, title, type, onChange }) => {
    const [inputValue, setInputValue] = useState(value);

    const debouncedChange = useCallback(
        debounce((newValue) => {
            onChange(newValue);
        }, 1000),
        []
    );


    // Raise an event when the input field changes
    const handleChange = (e) => {
        setInputValue(e.target.value);
        debouncedChange(e.target.value);
    };

    return (
        <div className="flex items-center border-b border-gray-300 gap-x-2 px-2 py-1 bg-white rounded-md opacity-75 hover:opacity-100">
            <span className="text-xs font-medium text-[#0900FF] w-24">{title}</span>
            <input
                type={type}
                value={inputValue}
                onChange={handleChange}
                className="flex-1 text-gray-800 text-xs outline-none bg-transparent px-1 py-1 border border-gray-400 rounded focus:ring-1 focus:ring-blue-400"
            />
        </div>
    );
};

export default OrderInput;


