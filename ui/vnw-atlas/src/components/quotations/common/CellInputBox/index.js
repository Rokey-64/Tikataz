import { useState, useEffect} from "react";
import { CiEdit } from "react-icons/ci";
import { useTranslations } from "next-intl";

const CellInputBox = ({ value, title, type, onChange,  maxLength}) => {
    const t = useTranslations('trans');
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState(value);

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    const handleBlur = () => {
        setIsEditing(false);
        if (onChange) {
            const prepInput = inputValue.trim();
            onChange(prepInput);
        }
    };

    const handleOnchange = (e) => {
        if(type === "number" && isNaN(e.target.value)) return;
        setInputValue(e.target.value);
    };

    const getRenderValue = () => {
        if (!inputValue) return t("input_data");

        if (type === "number") {
            return parseInt(inputValue).toLocaleString("en-US");
        }
        return inputValue;
    };

    return (
        <div className="flex items-center border-b border-gray-300 gap-x-2 px-2 py-1 bg-white rounded-md opacity-100">
            {isEditing ? (
                <textarea
                    maxLength={maxLength}
                    spellCheck="false"
                    rows={3}
                    value={inputValue}
                    onChange={handleOnchange}
                    onBlur={handleBlur}
                    autoFocus
                    className="flex-1 text-gray-800 text-xs outline-none bg-transparent px-1 py-1 border border-gray-400 rounded focus:ring-1 focus:ring-blue-400"
                />
            ) : (
                <span 
                    className="flex-1 text-gray-800 text-xs cursor-pointer overflow-hidden max-h-16 line-clamp-6" 
                    style={{ display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 5 }}
                    onClick={() => setIsEditing(true)}
                >
                    {getRenderValue()}
                </span>
            )}
            <button onClick={() => setIsEditing(true)} className="p-1 text-red-600 hover:text-red-900">
                <CiEdit size={14} />
            </button>
        </div>
    );
};

export default CellInputBox;