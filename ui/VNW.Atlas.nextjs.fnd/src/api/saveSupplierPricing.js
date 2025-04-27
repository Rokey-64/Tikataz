
import axios from "axios";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

/**
 * Load branches from the server
 */
const saveSupplierPricing = async (data) => {
    const apiUrl = `${API_HOST}vmw/rfq/supliers/pricing`;
    try {
        const res = await axios.put(apiUrl, data, {
            headers: { "Content-Type": "application/json" },
            timeout: 10000,
            withCredentials: true,
        });
        return res.data.data;
    } catch (error) {
        return null;
    }
};

export default saveSupplierPricing;