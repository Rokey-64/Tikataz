
import axios from "axios";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

/**
 * Get a list of recently auto RFQs
 * @param {string} id - ID of the RFQ
 * @returns 
 */
const getRFQSupplierOrder = async (token) => {
    const apiUrl = `${API_HOST}vmw/rfq/supliers/orders?token=${token}`;
    try {
        const response = await axios.get(apiUrl, {
            validateStatus: function (status) {
                return (status === 200 || status === 401); // default
            },
        });
        if (response.status === 200) {
            return response.data.data.payload;
        }

        else if (response.status === 401) {
            return 'Unauthorized';
        }

    }
    catch (error) {
        return null;
    }
}

export default getRFQSupplierOrder;