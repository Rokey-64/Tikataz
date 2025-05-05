import React from "react";

/**
 * Compact TIKATAZ Logo Component
 * Displays a sleek version of the application logo with tight spacing
 * @returns {JSX.Element} Compact logo component
 */
const TikatazLogo = () => {
    return (
        <div className='flex items-center h-8 md:h-10 pointer-events-none select-none'>
            {/* Compact Logo Image */}
            <div className='h-full aspect-square flex items-center justify-center'>
                <img 
                    src="/logo.svg" 
                    alt="TIKATAZ Logo" 
                    className='h-[70%] w-auto object-contain'
                    draggable="false"
                />
            </div>
            
            {/* Compact Logo Text */}
            <span className='
                text-xl md:text-2xl 
                font-bold 
                ml-2 
                text-[#00305B]
                tracking-tight
            '>
                TIKATAZ
            </span>
        </div>
    );
};

export default TikatazLogo;