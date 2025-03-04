import axios from "axios";

const API_HOST = process.env.REACT_APP_API_HOST;

const LoadBasicSettings = async () => {
    /**
     * Get a list of basic settings
     */
    const apiUrl = "http://localhost:3160/vmw/atlas/settings/basic/find";
    try {
        const response = await axios.get(apiUrl);
        if (response.status === 200) {
            return response.data.data;
        }
    }
    catch (error) {
        return null;
    }
};

export default LoadBasicSettings;