import axios from "axios";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

export default async function findTagByMajor(_id, major) {
    /**
     * Get tags by major
     */
    const apiUrl = `${API_HOST}vmw/api/atlas/tag/findby`;
    try {
        const response = await axios.get(`${apiUrl}` + (_id ? `?_id=${_id}&major=${major}` : `?major=${major}`));
        if (response.status === 200) {
            return response.data;
        }

    }
    catch (error) {
        return null;
    }
}