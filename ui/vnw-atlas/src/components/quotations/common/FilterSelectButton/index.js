import { useState } from "react";

/**
 * Filter select button with a modern UI
 * @param {*} param0 
 * @returns 
 */
const FilterSelectButton = ({ label, checked, onChange }) => {
    const [isChecked, setIsChecked] = useState(checked);

    const handleToggle = () => {
        setIsChecked(!isChecked);
        if (onChange) onChange(!isChecked);
    };

    return (
        <div className="flex items-center space-x-2 cursor-pointer select-none" onClick={handleToggle}>
            <div className={`w-5 h-5 flex items-center justify-center rounded-md border transition-all shadow-md
                ${isChecked ? "bg-green-500 border-green-500 text-white" : "bg-white border-gray-400 text-gray-700 hover:bg-gray-100"}`}>
                {isChecked && <span className="text-sm">✔</span>}
            </div>
            <span className="text-gray-900 font-sans text-wrap max-w-96 text-sm">{label}</span>
        </div>
    );
};

export default FilterSelectButton;
