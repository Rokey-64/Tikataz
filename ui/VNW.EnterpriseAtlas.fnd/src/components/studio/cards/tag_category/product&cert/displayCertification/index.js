import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setProducts } from "../../../../../../redux/cardsSlice";
import Certificate from "../certificate";
/**
 * This component is used to display the certificates which the user just added
 * @param {*} param0 
 * @returns 
 */
const DisplayCertification = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.cards.products);

    const delCallback = (cert) => {
        const newCerts = products.certs.filter(c => c.id !== cert.id);
        dispatch(setProducts({
            ...products,
            certs: newCerts,
        }));
    };

    if (!products.certs.length) {
        return (
            <p className="text-gray-400 text-sm">
                (Chưa có chứng chỉ, chứng nhận nào)<br />
                Bạn có thể thêm chứng chỉ, chứng nhận của mình để tăng tính minh bạch và uy tín cho thương hiệu của mình.
            </p>
        );
    }
    else {
        return (
            products.certs.map((cert) => (
                <Certificate key={cert.id} cert={cert} callback={delCallback} />
            ))
        );
    }
};

export default DisplayCertification;