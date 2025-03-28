import axios from "axios";

const API_HOST = process.env.REACT_APP_API_HOST;

const UpdateBasicSettings = async (data) => {
    /**
     * Get a list of timezones
     */
    const apiUrl = `${API_HOST}vmw/atlas/settings/basic/update`;
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
        return null;
    }
}

export default UpdateBasicSettings;