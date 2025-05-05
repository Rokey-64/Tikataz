import CertificateList from "./CertificateList";
import CertificatesUpdateMode from "./CertificatesUpdateMode";
import CertificatesSelectButton from "./CertificatesSelectButton";
import Messages from "../../../../../common/Messages";

/**
 * This is the default input template for the Certificates card
 * @param {*} param0 
 * @returns 
 */
const Certificates = ({ callback,  setShowCertSelector, showCertSelector}) => {
    return (
        <>
            <div className="mb-6">
                <Messages type="CertMessage" />
                <div className="">
                    <CertificatesSelectButton callback={callback} />
                    <CertificateList />
                </div>
                <Messages type="CertMessage2" />
            </div>
            <CertificatesUpdateMode setShowCertSelector={setShowCertSelector} showCertSelector={showCertSelector} />
        </>
    );
};

export default Certificates;