import axios from "axios";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

/**
 * Load branches from the server
 */
const loadBranches = async () => {
    try {
        const res = await axios.get("http://localhost:3160/vmw/atlas/branch/find");
        
        if (res.status !== 200) 
            return null;

        return res.data.data;
    } catch (error) {
        return null;
    }
};

export default loadBranches;