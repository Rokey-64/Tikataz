import { useState } from 'react';

/**
 * This component is used to display the title and template of a module.
 * @param {*} title
 * @param {*} template 
 * @returns 
 */
const ElementModule = ({ title, note, template, isRequired, isOpen }) => {
    const [expand, setExpand] = useState(isOpen || false);
    const [hoverArea, setHoverArea] = useState(false);
    return (
        <div className="flex items-start justify-start">
            <div>
                <div className="flex items-center justify-start mt-5">
                    <div className="flex items-center justify-center">
                        <div className={`w-2 h-2 rounded-full  border ${hoverArea ? "bg-blue-700" : "bg-white"}`} />
                        <hr className="w-[20px]" />
                    </div>
                    <div className="flex items-center justify-center rounded-lg shadow-md bg-white w-[150px]">
                        <button className="text-[13px] font-semibold border p-1 rounded-lg text-[#320A0A] w-full h-full hover:bg-blue-100"
                            onClick={() => setExpand(!expand)}
                            onMouseEnter={() => setHoverArea(true)}
                            onMouseLeave={() => setHoverArea(false)}>
                            {title}
                        </button>


                    </div>

                </div>
                <div className={`ml-14 overflow-hidden transition-all duration-700 ${expand ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"}`}>

                    <div className='flex items-center justify-start'>
                        <h3 className="font-sans text-sm my-3">{note}</h3>
                        <label className={`text-red-600 text-sm font-sans ml-3 ${isRequired || false ? "block" : "hidden"}`}>(⚠)</label>
                    </div>
                    {template}
                </div>
            </div>
        </div>
    );
}

export default ElementModule;