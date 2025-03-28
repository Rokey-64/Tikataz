import React from "react";

/**
 * Create a header for the studio
 * @param {*} param0 
 * @returns 
 */
const StudioHeader = ({headerContent}) => {
    return (
        <div>
            <div className="grid grid-cols-[70%_30%] items-center justify-center bg-white shadow">
                <div className="flex items-center ">
                    <div className="mx-1 sm:mx-3 my-2 border-r border-gray-300">
                        <div className='flex w-36 items-center pointer-events-none select-none'>
                            <img src="/logo.svg" alt="logo" className='w-12' />
                            <span className='text-[#00305B] text-xl font-extrabold ml-2'>TIKATAZ</span>
                            
                        </div>
                    </div>
                    <div className="flex items-end justify-end h-10"><span className='items-start text-sm font-bold text-black opacity-45'>▶ {headerContent}</span></div>
                </div>
                
                <div className="flex items-center ml-auto ">
                    <div className="flex justify-center"></div>
                    <div className="hidden md:block mt-2 mr-10 ml-5"></div>
                </div>
            </div>
        </div>
    );
};

export default StudioHeader;