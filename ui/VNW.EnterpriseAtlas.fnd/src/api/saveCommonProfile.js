import axios from "axios";

const API_HOST = process.env.REACT_APP_API_HOST;

const SaveCommonProfile = async (data) => {
    /**
     * Save the common profile to the server
     */
    const apiUrl = `${API_HOST}vmw/atlas/profile/update`;
    try {
        const response = await axios.post(apiUrl, data, {
            headers: { "Content-Type": "application/json" }
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