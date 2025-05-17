
import axios from "axios";
import axiosInstance from "./api";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

/**
 * Delete the leader from the server
 */
const DeleteLeader = async (data) => {
    const apiUrl = `${API_HOST}auths/leaders`;
    try {
        // const response = await axios.delete(apiUrl, {
        //     data:{id:data},
        //     withCredentials: true,
        // });

        const response = await axiosInstance.delete(apiUrl, {
            data:{id: data}
        });


        if (response.status === 200){
            return response.data.data;
        }
        
    } catch (error) {
        return null;
    }
};

export default DeleteLeader;