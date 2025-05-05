import React, { useState, useEffect} from "react";
import get from "lodash/get";
import CheckCustomButton from "../../../../../common/CheckCustomButton";

/**
 * Offers the user a choice between "Yes" and "No".
 * @param {*} Option 
 * @param {*} explain 
 * @returns 
 */
const QuestionTypeOption1 = ({callback, path, root, title, explain, children}) => {
    const [checked, setChecked] = useState(false);
    const valPath = `${path}.value`;

    useEffect(() => {

        setChecked(get(root, valPath, false));
    }, [valPath]);

    const inputChange = () => {
        setChecked(!checked);
        callback&&callback(root, valPath, !checked);
    }

    const updatedChildren = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            const newPath = `${path}.${child.props.path}`;
            return React.cloneElement(child, { path: newPath });
        }
        return child;
    });

    return (
        <div>
            <div className="flex items-center justify-start">
                <CheckCustomButton checked={checked} onChange={inputChange} />
                <label className="font-semibold text-sm ml-1">{title}</label>
            </div>
            <div className="max-w-[1000px] mb-3">
                <label className="font-sans text-[13px]">{explain}</label>
            </div>
            <div className={`ml-5 transition-all duration-300 ${checked ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"}`}>
                {updatedChildren}
            </div>
        </div>
    );
};

export default QuestionTypeOption1;