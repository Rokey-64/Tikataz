import axios from "axios";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

const TimezoneCategory = async () => {
    /**
     * Get a list of timezones
     */
    const apiUrl = `${API_HOST}vmw/atlas/timezone/find`;
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

export default TimezoneCategory;