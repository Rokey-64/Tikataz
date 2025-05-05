import React, { useEffect, useState } from 'react'
import SCLayout from '../resp-sc-layout/SCLayout.js'
import MdLayout from '../resp-md-layout/MdLayout.js'
import XlLayout from '../resp-xl-layout/XlLayout.js'

/**
|--------------------------------------------------
| 
|--------------------------------------------------
*/
export default function MainLayout() {
    const [screenSize, setScreenSize] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);


    if (screenSize < 768) {
        return (
            <div>
                <div>
                    <SCLayout />
                </div>
            </div>
        );
    } else if (screenSize >= 768 && screenSize < 1280) {
        return (
            <div>
                <div>
                    <MdLayout />
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <div>
                    <XlLayout />
                </div>
            </div>
        );
    }
}
