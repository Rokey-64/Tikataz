import axios from "axios";
import axiosInstance from "./api";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

/**
 * Get key for a new quote
 * @returns 
 */
const getQuoteInit = async () => {
    const apiUrl = `${API_HOST}auths/rfq/init`;
    try {
        // const response = await axios.get(apiUrl, {
        //     withCredentials: true
        // });
        const response = await axiosInstance.get(apiUrl);
        if (response.status === 200) {
            return response.data.data.id;
        }

    }
    catch (error) {
        return null;
    }
}

export default getQuoteInit;