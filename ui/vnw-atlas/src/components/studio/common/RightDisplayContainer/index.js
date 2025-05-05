import { IoClose } from "react-icons/io5";
import RightChildrenBox from "../RightChidrenBox";

/**
 * This container contains a form that can be used to delete selected data.
 * ** they wil be fixed on the right side of the page **
 * @param {*} param0 
 * @returns 
 */
const RightDisplayContainer = ({ headerContent, children, state, setState }) => {
    const closeHandleClick = () => {
        setState({ ...state, state: "" });
    };

    return (
        <div className="absolute top-3 right-2 w-fit shadow-xl z-50 bg-[#eaf3fa]">
            <div >
                <div className="grid grid-cols-2 gap-3 pl-3 " >
                    <div className='flex justify-start pt-5 h-[58px] '>
                    </div>
                    <div className='flex justify-end items-start'>
                        <button className=" hover:text-red-600  text-black opacity-50 hover:opacity-100 sticky w-8 h-8 top-0 right-0" onClick={closeHandleClick}>
                            <IoClose className='text-2xl' />
                        </button>
                    </div>
                </div>

            </div>
            <div className="mt-0 mb-2">
                <hr />
            </div>
            <div className="px-4 overflow-y-auto max-h-[calc(100vh-10rem)] min-h-[calc(100vh-10rem)] flex bg-gradient-to-t from-[#ffffff] to-[#eaf3fa]">
                <div className="sm:min-w-[480px] sm:max-w-[480px] mx-2 mt-6">
                    <RightChildrenBox children={<>{headerContent}{children}</>}/>
                </div>
            </div>

            <div className="flex justify-end items-start shadow-sm sticky bottom-0 bg-[#eaf3fa] py-3 pr-2 gap-3 ">
                <button
                    className="bg-white text-black border border-black font-medium w-32 h-8 rounded hover:bg-gray-100 focus:outline-none"
                    onClick={closeHandleClick}
                >
                    Quay về
                </button>
            </div>
        </div>
    )
};

export default RightDisplayContainer