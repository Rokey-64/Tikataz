import axios from "axios";
import axiosInstance from "./api";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

/**
 * Get the card data from the server
 * @returns 
 */
const loadCard = async (cardId, cardStatus) => {
    const apiUrl = `${API_HOST}auths/cards/init?id=${cardId}&st=${cardStatus}`;
    try {
        // const response = await axios.get(apiUrl, {
        //     withCredentials: true
        // });
        const response = await axiosInstance.get(apiUrl);
        
        if (response.status === 200) 
            return response.data.data;
        
    } catch (error) {
        return null;
    }
};

export default loadCard;