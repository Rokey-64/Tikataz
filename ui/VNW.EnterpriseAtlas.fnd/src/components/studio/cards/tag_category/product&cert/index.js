import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";


import CardMessages from "../../../common/messages";
import DisplayCertification from "./displayCertification";
import InsertCertification from "./insertCertification";
import SelCertificationButton from "./selCertButton";
import ProductCategory from "../../product_category/productCatergory";

const IFProductCert = () => {
    const [showCertSelector, setShowCertSelector] = useState(false);

    const showCertSelectorHandler = () => {
        setShowCertSelector(true);
    };

    return (
        <div className="bg-[#fcfbfb] p-4">
            <div className="flex flex-col">
                <CardMessages type="ProductMessage" />
                <ProductCategory />
            </div>
            {/* Certification Section */}
            <div className="mb-6">
                <CardMessages type="CertMessage" />
                <div className="">
                    <SelCertificationButton callback={showCertSelectorHandler}/>
                    <DisplayCertification/>
                </div>
                <CardMessages type="CertMessage2" />
            </div>
            <InsertCertification setShowCertSelector={setShowCertSelector} showCertSelector={showCertSelector}/>
        </div>
    );
};

export default IFProductCert;