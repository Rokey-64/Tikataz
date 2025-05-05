import axios from "axios";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

/**
 * Load Inline Cards
 * @returns 
 */
const getInlineCards = async () => {
    const apiUrl = `${API_HOST}auths/cards/inline`;
    try {
        const response = await axios.get(apiUrl, {
            withCredentials: true
        });
        if (response.status === 200) {
            return response.data;
        }

    }
    catch (error) {
        return null;
    }
}

export default getInlineCards;