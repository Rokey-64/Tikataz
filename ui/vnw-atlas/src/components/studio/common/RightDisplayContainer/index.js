import { IoClose } from "react-icons/io5";
import RightChildrenBox from "../RightChidrenBox";
import RightInputContainer from "../RightInputContainer";

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
        <div className="absolute top-14 md:top-5 right-0 md:right-3 w-fit shadow-xl z-[100] bg-[#eaf3fa]">
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
            <div className="p-6 overflow-y-auto flex  shadow-xl bg-gradient-to-t from-[#ffffff] to-[#cbe1f1] 
                            max-h-[calc(100vh-15rem)] min-h-[calc(100vh-15rem)]
                            md:max-h-[calc(100vh-8rem)] md:min-h-[calc(100vh-8rem)]">
                                
                <div className="sm:min-w-[480px] sm:max-w-[480px] md:min-w-[480px] md:max-w-[480px] w-full mx-2 mt-6">
                    <RightChildrenBox>
                        <>{headerContent}{children}</>
                    </RightChildrenBox>
                    <div className="h-40" />
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