import { useState, useCallback} from "react";
import { debounce } from "lodash";

const OrderTextArea = ({ value, title, onChange }) => {
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
        <div className="flex flex-col border-b border-gray-300 px-2 py-1 bg-white rounded-md opacity-80 hover:opacity-100">
            <span className="text-xs font-medium text-[#0900FF]">{title}</span>
            <textarea
                value={inputValue}
                onChange={handleChange}
                spellCheck="false"
                rows={2}
                className="resize-none text-gray-800 text-xs outline-none bg-transparent px-1 border border-gray-400 rounded focus:ring-1 focus:ring-blue-400"
            />
        </div>
    );
};

export default OrderTextArea;
