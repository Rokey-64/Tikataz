
import { useState } from "react";

/**
 * This component is a custom select box with a modern UI
 * @param {*} param0 
 * @returns 
 */
const FilterOptionButton = ({ options, selected, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(selected || options[0]);

    const handleSelect = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
        if (onChange) onChange(option);
    };

    return (
        <div className="relative w-48">
            <button 
                className="w-full px-2 py-1 text-gray-800 bg-white border border-gray-300 rounded-lg shadow-md flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-indigo-400"
                onClick={() => setIsOpen(!isOpen)}
            >
                {selectedOption}
                <span className="text-gray-500">▼</span>
            </button>
            {isOpen && (
                <ul className="absolute w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden z-10">
                    {options.map((option, index) => (
                        <li 
                            key={index} 
                            className="px-2 py-1 hover:bg-indigo-100 cursor-pointer"
                            onClick={() => handleSelect(option)}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FilterOptionButton;
