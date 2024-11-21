import Item from "./item/item";
import { BiSolidLeftArrow } from "react-icons/bi";
import { BiSolidRightArrow } from "react-icons/bi";


/**
 * This component is used to display a few of items
 * @returns 
 */
const ItemBox = () => {
    return (
        <div className="flex items-center">
            <div>
                <button className="flex items-center justify-center w-5 sm:w-10 h-5 sm:h-10 bg-white mt-3 sm:mt-5 mr-2 sm:mr-5  rounded-3xl shadow-[0px_1px_2px_rgba(0,0,0,0.3)] hover:bg-cyan-200">
                    <BiSolidLeftArrow className="text-[#8EA1B2]"/>
                </button>
            </div>
            <div className="flex">
                <Item />
                <Item />
            </div>
            <div>
                <button className="flex items-center justify-center w-5 sm:w-10 h-5 sm:h-10 bg-white mt-3 sm:mt-5 mr-2 sm:mr-5  rounded-3xl shadow-[0px_1px_2px_rgba(0,0,0,0.3)]  hover:bg-cyan-200">
                    <BiSolidRightArrow className="text-[#8EA1B2]"/>
                </button>
            </div>
        </div>
    );
};

export default ItemBox;