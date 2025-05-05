
import axios from "axios";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

/**
 * Load branches from the server
 */
const UpdateBranches = async (data) => {
    const apiUrl = `${API_HOST}auths/branches`;
    try {
        const res = await axios.post(apiUrl, data,
            {
                headers: { "Content-Type": "application/json" },
                timeout: 10000,
                withCredentials: true,
            }
        );
        
        if (res.status !== 200) 
            return null;

        return res.data.data;
    } catch (error) {
        return null;
    }
};

export default UpdateBranches;