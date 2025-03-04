
import axios from "axios";

const API_HOST = process.env.REACT_APP_API_HOST;

/**
 * Load branches from the server
 */
const UpdateBranches = async (data) => {
    const apiUrl = `${API_HOST}vmw/atlas/branch/update`;
    try {
        const res = await axios.post(apiUrl, data,
            {
                headers: { "Content-Type": "application/json" }
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