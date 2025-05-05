
import axios from "axios";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

/**
 * Delete an RFQ from the server
 */
const deleteRFQ = async (id, active) => {
    try {
        const res = await axios.delete(`${API_HOST}auths/rfq/stop`, {
            data:{id: id, active: active},
            withCredentials: true,
        });
        if (res.status !== 200) 
            return null;

        return res.data.data;
    } catch (error) {
        console.error("Error deleting RFQ:", error);
        return null;
    }
};

export default deleteRFQ;