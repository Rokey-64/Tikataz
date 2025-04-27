import axios from "axios";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

/**
 * This function is responsible for uploading card data
 * @param {*} data - The data to be uploaded 
 * @returns 
 */
const UploadCardData = async (data) => {
    /**
     * Get a list of timezones
     */
    const apiUrl = `${API_HOST}vmw/me/card/update/slave`;
    try {
        const response = await axios.post(apiUrl, data, {
            headers: { "Content-Type": "application/json" },
            timeout: 10000,
            withCredentials: true,
        });

        if (response.status === 200) {
            return true;
        }

    }
    catch (error) {
        return false;
    }
};

export default UploadCardData;

