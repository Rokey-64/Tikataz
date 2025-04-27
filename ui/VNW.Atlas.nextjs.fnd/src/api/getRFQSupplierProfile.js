
import axios from "axios";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

/**
 * Get a list of recently auto RFQs
 * @param {string} id - ID of the RFQ
 * @returns 
 */
const getRFQSupplierProfile = async (token, payload) => {
    const apiUrl = `${API_HOST}vmw/rfq/supliers/profile?token=${token}`;
    try {
        const response = await axios.get(apiUrl);
        if (response.status === 200) {
            return response.data.data.payload;
        }
    }
    catch (error) {
        return null;
    }
}

export default getRFQSupplierProfile;