import React from "react";
import { MdOutlineFilterList } from "react-icons/md";
import { IoSearch, search} from "react-icons/io5";

/**
 * When the search box is inside the toolbar, this component is used to display the search box. its usually used in the MD and LG screen sizes
 * @param {*} param0 
 * @returns 
 */
const InsideSearch = ({ searchClick, value, onchange}) => {
    return (
        <div className="mx-1 sm:mx-4 md:mx-8 ">
            <div className="hidden sm:block ">
                <form>
                    <div className="flex ">
                        <div>
                            <input type="search" value={value} onChange={onchange} placeholder="Search..." className="w-full min-w-96  h-10 rounded-3xl border border-gray-300 px-5 outline-none" />
                        </div>
                        <div>
                            <button>
                                <MdOutlineFilterList className="size-5 text-cyan-400 hover:text-cyan-300" />
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="block sm:hidden ">
                <div className="flex items-center">
                    <button className="hover:bg-[#e1e1e2] p-1 rounded-full" onClick={searchClick}>
                        <IoSearch className="size-6 text-[#848484]" />
                    </button>
                    <span className="text-[14px] sm:text-base ml-1">
                        Tìm kiếm
                    </span>
                </div>
            </div>
        </div>
    );
};

export default InsideSearch;