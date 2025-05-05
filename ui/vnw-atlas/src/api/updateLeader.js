
import axios from "axios";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

/**
 * Load branches from the server
 */
const SaveLeaders = async (formData) => {
    const apiUrl = `${API_HOST}auths/leaders`;
    try {
        const res = await axios.post(apiUrl, formData, {
            headers: { "Content-Type": "multipart/form-data" },
            timeout: 10000,
            withCredentials: true,
        });

        return res.data.data;
    } catch (error) {
        return null;
    }
};

export default SaveLeaders;