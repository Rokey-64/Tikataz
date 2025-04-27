
import axios from "axios";

const API_HOST = process.env.REACT_APP_API_HOST;

/**
 * Delete an RFQ from the server
 */
const deleteRFQ = async (id, active) => {
    try {
        const res = await axios.delete(`${API_HOST}vmw/rfq/cancel`, {data:{id: id, active: active}});
        if (res.status !== 200) 
            return null;

        return res.data.data;
    } catch (error) {
        console.error("Error deleting RFQ:", error);
        return null;
    }
};

export default deleteRFQ;