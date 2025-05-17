import axios from "axios";
import axiosInstance from "./api";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

/**
 * Load Inline Cards
 * @returns 
 */
const getInlineCards = async () => {
    const apiUrl = `${API_HOST}auths/cards/inline`;
    try {
        // const response = await axios.get(apiUrl, {
        //     withCredentials: true
        // });
        const response = await axiosInstance.get(apiUrl);
        if (response.status === 200) {
            return response.data;
        }

    }
    catch (error) {
        return null;
    }
}

export default getInlineCards;