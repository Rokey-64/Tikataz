
import axios from "axios";
import axiosInstance from "./api";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

/**
 * Delete an RFQ from the server
 */
const deleteRFQ = async (id, active) => {
    const apiUrl = `${API_HOST}auths/rfq/stop`;
    try {
        // const response = await axios.delete(apiUrl, {
        //     data:{id: id, active: active},
        //     withCredentials: true,
        // });

        const response = await axiosInstance.delete(apiUrl, {
            data:{id: id, active: active}
        });

        if (response.status !== 200) 
            return response.data.data;
    } catch (error) {
        return null;
    }
};

export default deleteRFQ;