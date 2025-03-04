import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setProducts } from "../../../../redux/cardsSlice";
import CertificateBox from "../certificate_box/index";
import CertInputData from "./CertInputData";
import CertSeaching from "./CertSeaching";
import SelectedCertImage from "./selectedCertImage";
import CertSave from "./certSave";
import { nanoid } from "@reduxjs/toolkit";
import CardMessages from "../../common/messages";
import certsTemplate from "../../../../services/certTemplate";

const CertSelector = ({ callback }) => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.cards.products);
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
        dispatch(
            setProducts({
                ...products,
                certs: [...products.certs, {
                    certype: formData.certype,
                    certCode: formData.certCode,
                    certProvider: formData.certProvider,
                    certValidDate: formData.certValidDate,
                    certExpiredDate: formData.certExpiredDate,
                    certWeblink: formData.certWeblink,
                    id: nanoid(),
                }],
            })
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
            <CertSeaching certificates={certsTemplate} setFormData={setFormData} />

            {/* certsTemplate */}
            <div className="my-4 gap-3 grid grid-cols-[repeat(auto-fill,minmax(25px,1fr))]">
                {
                    certsTemplate.map((cert) => (
                        <button key={cert.path} className="col-span-1" onClick={() => certOnclick(cert)}>
                            <CertificateBox path={`/cert/${cert.path}`} />
                        </button>
                    ))
                }
            </div>

            <hr />

            <div className="mt-3">
                <SelectedCertImage selectedCert={getCertPathFromName(formData.certype)} />
                <CardMessages type="CertInputMessage" />

                    <div className="grid grid-cols-2 gap-4">
                        <CertInputData type="text" name="certCode" value={formData.certCode} callback={handleInputChange} placeholder="Mã số chứng chỉ" />
                        <CertInputData type="text" name="certProvider" value={formData.certProvider} callback={handleInputChange} placeholder="Tên tổ chức cung cấp" />
                        <CertInputData type="date" name="certValidDate" value={formData.certValidDate} callback={handleInputChange} placeholder="Từ ngày" />
                        <CertInputData type="date" name="certExpiredDate" value={formData.certExpiredDate} callback={handleInputChange} />
                        <CertInputData type="text" name="certWeblink" value={formData.certWeblink} callback={handleInputChange} placeholder="Địa chỉ website" />
                        <CertSave saveCert={saveOnClick} />
                    </div>
            </div>

        </div>
    );
};

export default CertSelector;
