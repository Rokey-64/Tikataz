import axios from "axios";

const API_HOST = process.env.REACT_APP_API_HOST;

/**
 * Get the RFQ order details
 * @returns 
 */
const getRFQOrder = async (orderID) => {
    const apiUrl = `${API_HOST}vmw/rfq/order/display?id=${orderID}`;
    try {
        const response = await axios.get(apiUrl);
        if (response.status === 200) {
            return response.data.data.payload;
        }

    }
    catch (error) {
        return null;
    }
}

export default getRFQOrder;