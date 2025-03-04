import axios from "axios";

const API_HOST = process.env.REACT_APP_API_HOST;

/**
 * This function is used to load common profile information from the server
 * @returns 
 */
const loadCommonProfile = async () => {
    const apiUrl = `${API_HOST}vmw/atlas/profile/find`;
    try {
        const res = await axios.get(apiUrl);
        if (res.status !== 200) 
            return null;

        return res.data.data;
    } catch (error) {
        return null;
    }
};

export default loadCommonProfile;