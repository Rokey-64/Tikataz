import axios from "axios";
import axiosInstance from "./api";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;


/**
 * Allows none-account suppliers to update their profile information from RFQ page.
 * 
 * @param {*} payload 
 * @returns 
 */
const updateSupplierProfile = async (token, payload) => {
    const apiUrl = `${API_HOST}public/quotes/profile`;
    try {
        // const response = await axios.put(apiUrl, {"payload":payload, "token":token}, {
        //     headers: { "Content-Type": "application/json" },
        //     timeout: 10000,
        //     withCredentials: true,
        // });

        const response = await axiosInstance.put(apiUrl, payload, {
            headers: { "Content-Type": "application/json" },
            timeout: 10000,
        });

        if (response.status === 200) {
            return response.data.data;
        }

    }
    catch (error) {
        return null;
    }
}

export default updateSupplierProfile;