import axios from "axios";

const API_HOST = process.env.REACT_APP_API_HOST;

export default async function defaultTag(_id) {
    /**
     * Get default tag
     */
    const apiUrl = `${API_HOST}vmw/api/atlas/tag/find`;
    try {
        const path = `${apiUrl}` + (_id ? `?_id=${_id}` : "");
        const response = await axios.get(path);
        if (response.status === 200) {
            return response.data;
        }

    }
    catch (error) {
        return null;
    }
}