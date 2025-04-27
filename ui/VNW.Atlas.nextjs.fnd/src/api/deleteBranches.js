
import axios from "axios";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

/**
 * Delete branches from the server
 */
const DeleteBranches = async (data) => {
    try {
        const res = await axios.delete(`${API_HOST}vmw/atlas/branch/delete`, {data:{ids: data}});
        if (res.status !== 200) 
            return null;

        return res.data.data;
    } catch (error) {
        return null;
    }
};

export default DeleteBranches;