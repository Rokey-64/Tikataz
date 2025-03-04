
import axios from "axios";

const API_HOST = process.env.REACT_APP_API_HOST;

/**
 * Delete the leader from the server
 */
const DeleteLeader = async (data) => {
    try {
        const res = await axios.delete("http://localhost:3160/vmw/atlas/leader/delete", {data:{id:data}});
        if (res.status !== 200) 
            return null;

        return res.data.data;
    } catch (error) {
        return null;
    }
};

export default DeleteLeader;