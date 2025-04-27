import { useState, useEffect, useCallback} from "react";
import set from "lodash/set";
import get from "lodash/get";
import { debounce } from "lodash";

/**
 * Offers the user a choice between "Yes" and "No".
 * @param {*} title 
 * @param {*} unit 
 * @returns 
 */
const QuestionTypeInput = ({path, root, callback, title, unit}) => {
    const [value, setValue] = useState(0);
    const valPath = `${path}.value`;

    useEffect(() => {
        setValue(get(root, valPath, ""));
    }, []);

    const inputDebounce = useCallback(debounce((root, valPath, value) => {
        set(root, valPath, value);
        callback&&callback(root, valPath, value);
    }, 500), []);

    const inputChange = (e) => {
        setValue(e.target.value);
        inputDebounce(root, valPath, e.target.value);
    }

    return (
        <div className="flex items-center justify-start my-3">
            <label className="font-sans text-sm mx-1">{title}</label>
            <input type="text" className="border border-gray-500 rounded-md w-16 px-1 text-sm text-center" onChange={inputChange} value={value===0 ? "" : value}/>
            <label className="font-sans text-sm mx-1">{unit}.</label>
        </div>
    );
};

export default QuestionTypeInput;