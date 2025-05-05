import axios from "axios";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

/**
 * Get key for a new quote
 * @returns 
 */
const getQuoteInit = async () => {
    const apiUrl = `${API_HOST}auths/rfq/init`;
    try {
        const response = await axios.get(apiUrl, {
            withCredentials: true
        });
        if (response.status === 200) {
            return response.data.data.id;
        }

    }
    catch (error) {
        return null;
    }
}

export default getQuoteInit;