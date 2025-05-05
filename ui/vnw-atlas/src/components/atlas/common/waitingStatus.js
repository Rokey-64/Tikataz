import React from 'react';

const LoadingSpinner = () => {
    return (
        <div className="fixed inset-0 flex justify-center items-center z-50">
            {/* Background với radial gradient trắng và mờ dần ra ngoài */}
            <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,1),_rgba(255,255,255,0))]"></div>

            <div className="w-16 h-16 border-4 border-t-transparent border-b-blue-500 border-l-blue-500 border-r-transparent rounded-full animate-spin"></div>
        </div>
    );
};

export default LoadingSpinner;
