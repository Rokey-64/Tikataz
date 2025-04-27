import axios from "axios";

const API_HOST = process.env.REACT_APP_API_HOST;

/**
 * Get Item History List
 * @returns 
 */
const getItemHistoryList = async (search) => {
    let apiUrl = `${API_HOST}vmw/rfq/items/history`;
    if(search) {
        apiUrl = `${API_HOST}vmw/rfq/items/history?search=${search}`;
    }

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

export default getItemHistoryList;