// import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import CertificateElement from "./CertificateElement";
/**
 * This component is used to display the certificates which the user just added
 * @param {*} param0 
 * @returns 
 */
const CertificateList = () => {
    const certificates = useSelector(state => state.cards.certificates);

    if (!certificates.length) {
        return (
            <p className="text-gray-400 text-sm">
                (Chưa có chứng chỉ, chứng nhận nào)<br />
                Bạn có thể thêm chứng chỉ, chứng nhận của mình để tăng tính minh bạch và uy tín cho thương hiệu của mình.
            </p>
        );
    }
    else {
        return (
            certificates.map((cert) => (
                <CertificateElement key={cert.id} cert={cert}/>
            ))
        );
    }
};

export default CertificateList;