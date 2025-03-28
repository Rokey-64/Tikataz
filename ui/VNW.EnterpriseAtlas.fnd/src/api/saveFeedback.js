import axios from "axios";

const API_HOST = process.env.REACT_APP_API_HOST;

const SaveFeedback = async (data) => {
    /**
     * Save the common profile to the server
     */
    const apiUrl = `${API_HOST}vmw/atlas/feedback/update`;
    try {
        const response = await axios.post(apiUrl, data, {
            headers: { "Content-Type": "application/json" },
            timeout: 10000,
            withCredentials: true,
        });
        if (response.status === 200) {
            return response.data.data;
        }
    }
    catch (error) {
        alert(error);
        return null;
    }
};

export default SaveFeedback;