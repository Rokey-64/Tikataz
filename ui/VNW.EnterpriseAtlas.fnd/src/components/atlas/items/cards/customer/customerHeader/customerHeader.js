import { useState, useEffect } from "react";

/**
 * This component is used to display the header of the customer card.
 * @returns 
 */
const CustomerHeader = ({tag}) => {
    const [description, setDescription] = useState("")
    const [title, setTitle] = useState("")

    useEffect(() => {      
        /** Trim the description if it is over 110 characters */
        if (tag.description)
            setDescription(tag.description.length > 200 ? tag.description.slice(0, 200) + " ..." : tag.description)
    
        /** Trim the title if it is over 70 characters */
        if (tag.company.title)
            setTitle(tag.company.title.length > 50 ? tag.company.title.slice(0, 50) : tag.company.title)
    },[tag])

    function capitalizeWords(str) {
        return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }

    return (
        <div className="w-56 sm:w-[27.5rem] mt-1">
            <p className="font-semibold text-[9px] sm:text-[18px] text-[#B1A001]">{capitalizeWords(title)}</p>
            <div className="h-5 mb-3">
                <p className="text-[8px] sm:text-[14px] font-sans text-[#051073]">
                    {description}
                </p>
                {/* <span className="text-[0.5rem] sm:text-base font-normal text-[#051073] "></span> */}
            </div>
        </div>
    );
};

export default CustomerHeader;