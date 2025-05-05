import axios from "axios";

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
        const response = await axios.put(apiUrl, {"payload":payload, "token":token}, {
            headers: { "Content-Type": "application/json" },
            timeout: 10000,
            withCredentials: true,
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