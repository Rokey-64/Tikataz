import axios from "axios";

const API_HOST = process.env.REACT_APP_API_HOST;

const NationCategory = async () => {
    /**
     * Get a list of nations
     */
    const apiUrl = `${API_HOST}vmw/atlas/nation/find`;
    try {
        const response = await axios.get(apiUrl);
        if (response.status === 200) {
            return response.data.data;
        }

    }
    catch (error) {
        return null;
    }
}

export default NationCategory;