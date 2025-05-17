import axios from "axios";
import axiosInstance from "./api";

/**
 * Load image from the server
 * @returns 
 */
const FetchImage = async (url) => {

    if (!url) return '';

    /**
     * Get a list of timezones
     */
    try {
        const response = await axios.get(url, {
            responseType: 'blob',
            withCredentials: true
        });
        
        if (response.status === 200) {
            return response.data;
        }

    }
    catch (error) {
        return '';
    }
}

export default FetchImage;