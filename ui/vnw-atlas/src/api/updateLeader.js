
import axios from "axios";
import axiosInstance from "./api";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

/**
 * Load branches from the server
 */
const SaveLeaders = async (formData) => {
    const apiUrl = `${API_HOST}auths/leaders`;
    try {
        // const response = await axios.post(apiUrl, formData, {
        //     headers: { "Content-Type": "multipart/form-data" },
        //     timeout: 10000,
        //     withCredentials: true,
        // });

        const response = await axiosInstance.post(apiUrl, formData, {
            headers: { "Content-Type": "multipart/form-data" },
            timeout: 10000,
        });

        if (response.status === 200) {
            return response.data.data;
        }
    } catch (error) {
        return null;
    }
};

export default SaveLeaders;