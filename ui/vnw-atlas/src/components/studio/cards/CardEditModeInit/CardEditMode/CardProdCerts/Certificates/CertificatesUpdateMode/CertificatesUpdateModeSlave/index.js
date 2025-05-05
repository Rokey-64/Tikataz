import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCerts } from "../../../../../../../../../redux/cardsSlice";
import CertificatesDisplayIcon from "./CertificatesDisplayIcon/index";
import CertificatesInputValue from "./CertificatesInputValue";
import CertificatesSearchingBox from "./CertificatesSearchingBox";
import CertificatesDisplaySelected from "./CertificatesDisplaySelected";
import CertificesSaveButton from "./CertificatesSaveButton";
import Messages from "../../../../../../../common/Messages";
import certsTemplate from "../../../../../../../../../services/certTemplate";

const CertificatesUpdateModeSlave = ({ callback }) => {
    const dispatch = useDispatch();
    const certificates = useSelector((state) => state.cards.certificates);
    const [formData, setFormData] = useState({
        certype: "",
        certPath: "",
        certCode: "",
        certValidDate: "",
        certExpiredDate: "",
        certProvider: "",
        certWeblink: "",
    });

    const certOnclick = (cert) => {
        setFormData((prev) => {
            return {
                ...prev,
                certype: cert.name
            };
        });
    };

    const saveOnClick = () => {
        if(!formData.certype){
            alert("Vui lòng chọn loại chứng chỉ");
            return;
        }

        if(!formData.certProvider){
            alert("Vui lòng nhập tên tổ chức cung cấp");
            return;
        }
        // Save the certificate to the redux store
        const certId = certificates.length + 1;
        dispatch(
            setCerts([...certificates, {
                certype: formData.certype,
                certCode: formData.certCode,
                certProvider: formData.certProvider,
                certValidDate: formData.certValidDate,
                certExpiredDate: formData.certExpiredDate,
                certWeblink: formData.certWeblink,
                id: certId,
            }])
        );

        // Return to the parent component
        callback && callback();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    /**
     * Get a certificate object by the certificate name
     * @param {*} name 
     * @returns 
     */
    const getCertPathFromName = (name) => {
        const obj = certsTemplate.find((cert) => cert.name === name);
        if(obj) return obj;
    };

    return (
        <div className="w-[600px] h-auto p-4 rounded">
            <CertificatesSearchingBox certificates={certsTemplate} setFormData={setFormData} />

            {/* certsTemplate */}
            <div className="my-4 gap-3 grid grid-cols-[repeat(auto-fill,minmax(25px,1fr))]">
                {
                    certsTemplate.map((cert) => (
                        <button key={cert.path} className="col-span-1" onClick={() => certOnclick(cert)}>
                            <CertificatesDisplayIcon path={`/cert/${cert.path}`} />
                        </button>
                    ))
                }
            </div>

            <hr />

            <div className="mt-3">
                <CertificatesDisplaySelected selectedCert={getCertPathFromName(formData.certype)} />
                <Messages type="CertInputMessage" />

                    <div className="grid grid-cols-2 gap-4">
                        <CertificatesInputValue type="text" name="certCode" value={formData.certCode} callback={handleInputChange} placeholder="Mã số chứng chỉ" />
                        <CertificatesInputValue type="text" name="certProvider" value={formData.certProvider} callback={handleInputChange} placeholder="Tên tổ chức cung cấp" />
                        <CertificatesInputValue type="date" name="certValidDate" value={formData.certValidDate} callback={handleInputChange} placeholder="Từ ngày" />
                        <CertificatesInputValue type="date" name="certExpiredDate" value={formData.certExpiredDate} callback={handleInputChange} />
                        <CertificatesInputValue type="text" name="certWeblink" value={formData.certWeblink} callback={handleInputChange} placeholder="Địa chỉ website" />
                        <CertificesSaveButton saveCert={saveOnClick} />
                    </div>
            </div>

        </div>
    );
};

export default CertificatesUpdateModeSlave;
