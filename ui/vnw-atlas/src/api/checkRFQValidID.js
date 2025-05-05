
import axios from "axios";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

/**
 * This API checks the invalid ID of the RFQ and get user profile.
 * If the ID is invalid, it will return an error message.
 * * @returns {Promise} - The response from the API.
 * 
 */
const checkRFQValidID = async (id) => {
    const apiUrl = `${API_HOST}auths/rfq/verify?id=${id}`;
    try {
        const response = await axios.get(apiUrl, {
            withCredentials: true
        });
        return response.data;
    }
    catch (error) {
        return null;
    }
}

export default checkRFQValidID;