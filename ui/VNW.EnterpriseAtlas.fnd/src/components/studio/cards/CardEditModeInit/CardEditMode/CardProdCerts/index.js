import { useState} from "react";

import Certificates from "./Certificates";
import Products from "./Products";

/**
 * Display the Product and Certification Section
 * @returns 
 */
const CardProdCerts = () => {
    const [showCertSelector, setShowCertSelector] = useState(false);

    const showCertSelectorHandler = () => {
        setShowCertSelector(true);
    };

    return (
        <div className="bg-[#fcfbfb] p-4">
            <Products />
            <Certificates callback={showCertSelectorHandler} setShowCertSelector={setShowCertSelector} showCertSelector={showCertSelector}/>
        </div>
    );
};

export default CardProdCerts;