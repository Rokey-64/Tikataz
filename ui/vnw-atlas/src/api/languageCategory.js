import axios from "axios";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

const LanguageCategory = async () => {
    /**
     * Get a list of timezones
     */
    const apiUrl = `${API_HOST}public/languages`;
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

export default LanguageCategory;