import axios from "axios";

const API_HOST = process.env.REACT_APP_API_HOST;

/**
 * This function is responsible for uploading card images
 * @param {*} formData - The form data to be uploaded 
 * @returns 
 */
const UploadCardImages = async (formData) => {
    /**
     * Get a list of timezones
     */
    const apiUrl = `${API_HOST}vmw/me/card/update/image`;
    try {
        const response = await axios.post(apiUrl, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });

        if (response.status === 200) {
            return response.data.data;
        }

    }
    catch (error) {
        return null;
    }
};

export default UploadCardImages;

