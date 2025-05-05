import axios from "axios";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

/**
 * Get the RFQ order details
 * @returns 
 */
const getRFQOrder = async (orderID) => {
    const apiUrl = `${API_HOST}auths/rfq/details?id=${orderID}`;
    try {
        const response = await axios.get(apiUrl, {
            withCredentials: true
        });
        if (response.status === 200) {
            return response.data.data.payload;
        }

    }
    catch (error) {
        return null;
    }
}

export default getRFQOrder;