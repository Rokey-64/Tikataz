import React, { useState } from "react";

/**
 * 
 * @param {*} param0 
 * @returns 
 */
const RadioOptionButton = ({data, callback}) => {
    const [selectedValue, setSelectedValue] = useState(data?.defaultAnswer.toString() || '1');
    const onChange = (e) => {
        setSelectedValue(e.target.value);
        callback && callback(e);
    };

    return (
        <div className="rounded-lg p-5 w-[38rem]">
            <label className="font-sans text-[14px] text-gray-800 text-wrap" dangerouslySetInnerHTML={{__html:data.question}}/>
            <div className="flex space-x-6 mt-3">
                {data.labels.map((item, index) => (
                    <div key={item.id} className="flex items-center space-x-1">
                        <input
                            className="h-3 w-3 text-blue-600 border-gray-300 focus:ring-blue-500 focus:ring-2"
                            type="radio"
                            name={data.id}
                            value={item.id}
                            checked={selectedValue === item.id}
                            
                            onChange={onChange}
                        />
                        <label className="font-sans text-[14px] text-gray-700">{item.value}</label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RadioOptionButton;
