import axios from "axios";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

/**
 * Get Item History List
 * @returns 
 */
const getListCurrency = async (token) => {
    let apiUrl = `${API_HOST}vmw/rfq/currency?token=${token}`;

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

export default getListCurrency;