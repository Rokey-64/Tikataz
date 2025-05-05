import axios from "axios";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

const TimezoneCategory = async () => {
    const apiUrl = `${API_HOST}public/timezones`;
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

export default TimezoneCategory;