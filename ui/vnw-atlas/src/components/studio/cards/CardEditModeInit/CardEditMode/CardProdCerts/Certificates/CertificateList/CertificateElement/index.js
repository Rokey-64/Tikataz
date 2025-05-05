import { useState } from "react";
import CertificatesRemoveMode from "./CertificatesRemoveMode";
import CertificatesLogo from "./CertificateLogo";
import CertificateNumber from "./CertificateNumber";
import CertificateDatetime from "./CertificateDatetime";
import CertificatesProvider from "./CertificateProvider";
import CertificateWebsite from "./CertificateWebsite";
import CertificateRemoveButton from "./CertificateRemoveButton";

/**
 * This component is used to show the certificate card
 * @param {*} param0 
 * @returns 
 */
const CertificateElement = ({ cert }) => {
    const [isDelete, setIsDelete] = useState(false);
    
    const removeCertHandler = () => {
        setIsDelete(true);
    }

    const certCallback = (status) => {
        setIsDelete(status);
    }

    return (
        <div className="p-4 border rounded-lg shadow-md text-sm font-sans">
            <div>
                <CertificatesLogo cert={cert} />
                <CertificatesProvider cert={cert} />
                <CertificateNumber cert={cert} />
                <CertificateDatetime cert={cert} />
                <CertificateWebsite cert={cert} />
            </div>
            <CertificateRemoveButton callback={removeCertHandler} />
            {isDelete && <CertificatesRemoveMode cert={cert} callback={certCallback} />}
        </div>
    );
};

export default CertificateElement