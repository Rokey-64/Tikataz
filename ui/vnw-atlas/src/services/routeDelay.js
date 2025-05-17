'use client'

import { useEffect, useState } from "react";
import ReactLoading from 'react-loading';

/**
 * Show a loading spinner for a certain amount of time before showing the children
 * @param {*} param0 
 * @returns 
 */
const DelayedRoute = ({ delay = 800, children }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShow(true), delay);
        return () => clearTimeout(timer);
    }, []);

    // return show ? children : <div className="flex items-center justify-center z-10 top-0 w-[calc(100vw)] h-[calc(100vh-180px)]
    //  md:w-[calc(100vw-268px)] md:h-[calc(100vh-180px)]">
    //     <ReactLoading type="bubbles" color="#7f8cfc" height={50} width={50} />
    // </div>;

    return children;
};

export default DelayedRoute;
