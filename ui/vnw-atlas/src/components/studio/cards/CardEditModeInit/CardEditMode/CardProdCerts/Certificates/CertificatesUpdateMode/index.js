import CertificatesUpdateModeSlave from "./CertificatesUpdateModeSlave";
import { useRef } from 'react';
import Draggable from 'react-draggable';

/**
 * This component is used to insert a certification
 * @param {*} param0 
 * @returns 
 */
const CertificatesUpdateMode = ({ showCertSelector, setShowCertSelector }) => {
    const nodeRef = useRef(null);
    const hideSelector = () => {
        setShowCertSelector(false);
    }

    if (!showCertSelector) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 min-w-screen min-h-screen bg-black bg-opacity-50">
            <div className=" bg-white rounded shadow-lg" ref={nodeRef}>
                {/* Nút đóng */}
                <div id='drag-handle' className="w-full h-8 flex items-center justify-end pr-2 hover:bg-gray-100 rounded">
                    <button
                        onClick={() => setShowCertSelector(false)}
                        className="w-6 h-6 flex items-center justify-center text-red-600 
                       hover:bg-red-600 hover:text-white transition rounded-full">
                        &#10005; {/* Dấu X Unicode */}
                    </button>
                </div>

                {/* Nội dung */}
                <div className="pt-6">
                    <CertificatesUpdateModeSlave callback={hideSelector} />
                </div>
            </div>
        </div>
    );
};

export default CertificatesUpdateMode;