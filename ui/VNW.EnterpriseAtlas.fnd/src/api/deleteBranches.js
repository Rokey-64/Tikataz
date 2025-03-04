
import axios from "axios";

const API_HOST = process.env.REACT_APP_API_HOST;

/**
 * Delete branches from the server
 */
const DeleteBranches = async (data) => {
    try {
        const res = await axios.delete("http://localhost:3160/vmw/atlas/branch/delete", {data:{ids: data}});
        if (res.status !== 200) 
            return null;

        return res.data.data;
    } catch (error) {
        return null;
    }
};

export default DeleteBranches;