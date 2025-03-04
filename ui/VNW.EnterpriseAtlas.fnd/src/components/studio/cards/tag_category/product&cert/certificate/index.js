import { useState } from "react";
import RemoveCert from "../removeCertDialog";
import DisplayCertLogo from "./displayCertLogo";
import DisplayCertNumber from "./displayCertNumber";
import DisplayCertTime from "./displayCertTime";
import DisplayCertProvider from "./displayCertProvider";
import DisplayCertWeblink from "./displayCertWeblink";
import RemoveCertButton from "./removeCertButton";

/**
 * This component is used to show the certificate card
 * @param {*} param0 
 * @returns 
 */
const Certificate = ({ cert, callback }) => {
    const [isDelete, setIsDelete] = useState(false);
    

    const removeCertHandler = () => {
        setIsDelete(true);
    }

    const certCallback = (status) => {
        setIsDelete(status);
        callback&&callback(status);
    }

    return (
        <div className="p-4 border rounded-lg shadow-md text-sm font-sans">
            <div>
                <DisplayCertLogo cert={cert} />
                <DisplayCertProvider cert={cert} />
                <DisplayCertNumber cert={cert} />
                <DisplayCertTime cert={cert} />
                <DisplayCertWeblink cert={cert} />
            </div>
            <RemoveCertButton callback={removeCertHandler} />
            {isDelete && <RemoveCert cert={cert} callback={certCallback} />}
        </div>
    );
};

export default Certificate