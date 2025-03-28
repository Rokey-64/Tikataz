
import { useState, useEffect } from "react";
// This component is used to display the customer logo in the customer card.
const CustomerLogo = ({value}) => {
    return (
        <div className="flex items-center justify-center w-[50px] sm:w-32 h-[46px] sm:h-24 rounded-md sm:rounded-2xl bg-[#fafafa] shadow m-2 sm:m-3">
            <img src={value} alt="Avatar" className="max-w-full max-h-full object-contain p-1" 
            onError={(e) => { e.target.onerror = null; e.target.src = '/placeholder.jpg' }}/>
        </div>
    );
};


export default CustomerLogo;