import axios from "axios";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

/**
 * Load branches from the server
 */
const loadBranches = async () => {
    try {
        const apiUrl = `${API_HOST}auths/branches`;
        const res = await axios.get(apiUrl, {
            withCredentials: true
        });
        
        if (res.status !== 200) 
            return null;

        return res.data.data;
    } catch (error) {
        return null;
    }
};

export default loadBranches;