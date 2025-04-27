import axios from "axios";

const API_HOST = process.env.REACT_APP_API_HOST;

/**
 * Get key for a new quote
 * @returns 
 */
const getQuoteInit = async () => {
    const apiUrl = `${API_HOST}vmw/rfq/init`;
    try {
        const response = await axios.get(apiUrl);
        if (response.status === 200) {
            return response.data.data.id;
        }

    }
    catch (error) {
        return null;
    }
}

export default getQuoteInit;