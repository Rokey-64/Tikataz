import axios from "axios";

const API_HOST = process.env.REACT_APP_API_HOST;

const SaveCommonProfile = async (formData) => {
    /**
     * Save the common profile to the server
     */
    const apiUrl = `${API_HOST}vmw/atlas/profile/update`;
    try {
        const response = await axios.post(apiUrl, formData, {
            headers: { "Content-Type": "multipart/form-data" },
            timeout: 10000,
            withCredentials: true,
        });
        if (response.status === 200) {
            return response.data.data;
        }

    }
    catch (error) {
        return null;
    }
};

export default SaveCommonProfile;