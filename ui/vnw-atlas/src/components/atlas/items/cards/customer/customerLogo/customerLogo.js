import { useState } from "react";

const CustomerLogo = ({ value, className = "" }) => {
    const [imgSrc, setImgSrc] = useState(value);

    const handleError = () => {
        setImgSrc('/placeholder.jpg');
    };

    return (
        <div className={`flex items-center justify-center 
                        w-12 h-11 sm:w-32 sm:h-20
                        rounded-lg bg-gray-50 shadow-sm
                        border border-gray-100
                        transition-all hover:shadow-md
                        ${className}`}>
            <img 
                src={imgSrc} 
                alt="Company logo" 
                className="p-1 w-auto h-auto max-w-[90%] max-h-[90%] object-contain"
                onError={handleError}
                loading="lazy"
            />
        </div>
    );
};

export default CustomerLogo;