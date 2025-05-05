import axios from "axios";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

const nationCategory = async () => {
    /**
     * Get a list of nations
     */
    const apiUrl = `${API_HOST}public/nations`;
    try {
        const response = await axios.get(apiUrl, {
            withCredentials: true
        });
        if (response.status === 200) {
            return response.data.data;
        }

    }
    catch (error) {
        return null;
    }
}

export default nationCategory;