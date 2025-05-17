// import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import CertificateElement from "./CertificateElement";
import { useTranslations } from "next-intl";
/**
 * This component is used to display the certificates which the user just added
 * @param {*} param0 
 * @returns 
 */
const CertificateList = () => {
    const t = useTranslations('trans');
    const certificates = useSelector(state => state.cards.certificates);

    const content = t.rich

    if (!certificates.length) {
        return (

            <>
                {
                    t.rich("studio.card.cert.nocert", {
                        first: (chunk) => <p className="text-gray-400 text-sm">{chunk}</p>,
                        second: () => <br/>
                    })
                }
            </>
        );
    }
    else {
        return (
            certificates.map((cert) => (
                <CertificateElement key={cert.id} cert={cert} />
            ))
        );
    }
};

export default CertificateList;