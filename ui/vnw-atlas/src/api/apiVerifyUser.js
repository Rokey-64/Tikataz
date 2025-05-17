import axios from "axios";
import axiosInstance from "./api";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

/**
 * API 
 * @returns 
 */
const apiVerifyUser = async () => {
    try {

        const response = await axiosInstance.get(API_HOST);
        
        if (response.status === 200) {
            return response;
        }

    }
    catch (error) {
        return null;
    }
}

export default apiVerifyUser;