import axios from "axios";

const API_HOST = process.env.REACT_APP_API_HOST;

/**
 * Load leaders from the server
 */
const loadLeaders = async () => {
    try {
        const res = await axios.get("http://localhost:3160/vmw/atlas/leader/find");
        
        if (res.status !== 200) 
            return null;

        return res.data.data;
    } catch (error) {
        return null;
    }
};

export default loadLeaders;