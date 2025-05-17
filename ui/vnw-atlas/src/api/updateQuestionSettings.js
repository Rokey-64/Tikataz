import axios from "axios";
import axiosInstance from "./api";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

/**
 * Update a list of question settings
 * @param {*} key - The key of the question settings to load - privacy, announce
 * @param {*} data 
 * @returns 
 */
const UpdateQuestionSettings = async (key, data) => {
    const apiUrl = `${API_HOST}auths/settings/${key}`;
    try {
        // const response = await axios.post(apiUrl, {"answers":data}, {
        //     headers: { "Content-Type": "application/json" },
        //     timeout: 10000,
        //     withCredentials: true,
        // });

        const response = await axiosInstance.post(apiUrl, {"answers":data}, {
            headers: { "Content-Type": "application/json" },
            timeout: 10000,
        });

        if (response.status === 200) {
            return response.data.data;
        }

    }
    catch (error) {
        return null;
    }
}

export default UpdateQuestionSettings;