import axios from "axios";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

/**
 * Get Item History List
 * @returns 
 */
const getItemHistoryList = async (search) => {
    let apiUrl = `${API_HOST}auths/rfq/items`;
    if(search) {
        apiUrl = `${API_HOST}auths/rfq/items?search=${search}`;
    }

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

export default getItemHistoryList;