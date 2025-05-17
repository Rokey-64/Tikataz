import axios from "axios";
import axiosInstance from "./api";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

/**
 * Get Item History List
 * @returns 
 */
const getListCurrency = async (token) => {
    let apiUrl = `${API_HOST}public/quotes/currency?token=${token}`;

    try {
        // const response = await axios.get(apiUrl, {
        //     withCredentials: true
        // });
        const response = await axiosInstance.get(apiUrl);
        if (response.status === 200) {
            return response.data.data.payload;
        }

    }
    catch (error) {
        return null;
    }
}

export default getListCurrency;