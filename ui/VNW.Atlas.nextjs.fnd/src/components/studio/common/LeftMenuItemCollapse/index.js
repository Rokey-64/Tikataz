import { useState, useEffect} from "react";


import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";

const LeftMenuItemCollapse = ({ title, content, isOpen}) => {
    const [isProfileSelected, setIsProfileSelected] = useState(false);

    const handleProfileClick = () => {
        setIsProfileSelected(!isProfileSelected);
    }

    useEffect(() => {
        setIsProfileSelected(isOpen);
    }, [])

    return (
        <>
            <button className="flex items-center hover:bg-gray-100 w-full py-2 pl-3" onClick={handleProfileClick}>
                <div className="mr-2">
                    {
                        isProfileSelected ? <MdKeyboardArrowDown className="inline-block text-xl" /> : <MdKeyboardArrowRight className="inline-block text-xl" />
                    }
                </div>
                <p className="text-[13px] font-sans pt-[2px]">{title}</p>
            </button>

            <div>
                {isProfileSelected && content}
            </div>
        </>
    );
};

export default LeftMenuItemCollapse;