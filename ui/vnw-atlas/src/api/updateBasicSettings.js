import axios from "axios";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

const UpdateBasicSettings = async (data) => {
    const apiUrl = `${API_HOST}auths/settings/basic`;
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