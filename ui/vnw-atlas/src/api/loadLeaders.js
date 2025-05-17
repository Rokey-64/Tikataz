import axios from "axios";
import axiosInstance from "./api";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

/**
 * Load leaders from the server
 */
const loadLeaders = async () => {
    const apiUrl = `${API_HOST}auths/leaders`;
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

export default loadLeaders;