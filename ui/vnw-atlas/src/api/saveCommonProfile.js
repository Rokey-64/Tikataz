import axios from "axios";
import axiosInstance from "./api";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

const SaveCommonProfile = async (formData) => {
    /**
     * Save the common profile to the server
     */
    const apiUrl = `${API_HOST}auths/profile`;
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

    }
    catch (error) {
        console.error("Error saving common profile:", error);
        return null;
    }
};

export default SaveCommonProfile;