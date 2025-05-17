
import axios from "axios";
import axiosInstance from "./api";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

/**
 * Delete branches from the server
 */
const DeleteBranches = async (data) => {
    const apiUrl = `${API_HOST}auths/branches`;
    try {
        // const response = await axios.delete(apiUrl, {
        //     data:{ids: data},
        //     withCredentials: true,
        // });

        const response = await axiosInstance.delete(apiUrl, {
            data:{ids: data}
        });

        if (response.status === 200) {
            return response.data.data;
        }

        
    } catch (error) {
        return null;
    }
};

export default DeleteBranches;