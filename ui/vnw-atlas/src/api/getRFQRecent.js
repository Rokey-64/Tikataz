import axios from "axios";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

/**
 * Get a list of recently auto RFQs
 * @param {string} id - ID of the RFQ
 * @returns 
 */
const getRFQRecent = async (id, type) => {
    const apiUrl = `${API_HOST}auths/rfq/recent?id=${id}&type=${type}`;
    try {
        const response = await axios.get(apiUrl, {
            withCredentials: true
        });
        if (response.status === 200) {
            return response.data.data.payload;
        }

    }
    catch (error) {
        return null;
    }
}

export default getRFQRecent;