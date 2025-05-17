import axios from "axios";
import axiosInstance from "./api";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

/**
 * API 
 * @returns 
 */
const checkOverCard = async () => {
    const apiUrl = `${API_HOST}auths/cards/verify`;
    try {
        // const response = await axios.get(apiUrl, {
        //     validateStatus: function (status) {
        //         return status < 500;
        //     },
        //     withCredentials: true
        // });

        const response = await axiosInstance.get(apiUrl);
        return response;

    }
    catch (error) {
        return null;
    }
}

export default checkOverCard;