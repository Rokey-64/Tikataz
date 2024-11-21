import React from "react";

/**
 * Logo component that displays the TIKATAZ logo of the application
 * @returns 
 */
const Logo = () => {
    return (
        <div className='flex w-44 md:w-52 items-center pointer-events-none select-none'>
            <img src="logo.svg" alt="logo" className='w-12'/>
            <span className='text-[#00305B] text-2xl font-extrabold ml-2'>TIKATAZ</span>
        </div>
    );
};

export default Logo;