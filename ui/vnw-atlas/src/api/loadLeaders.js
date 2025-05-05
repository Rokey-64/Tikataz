import axios from "axios";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

/**
 * Load leaders from the server
 */
const loadLeaders = async () => {
    try {
        const res = await axios.get(`${API_HOST}auths/leaders`, {
            withCredentials: true
        });
        
        if (res.status !== 200) 
            return null;

        return res.data.data;
    } catch (error) {
        return null;
    }
};

export default loadLeaders;