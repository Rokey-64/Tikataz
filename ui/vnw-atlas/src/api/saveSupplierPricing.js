
import axios from "axios";
import axiosInstance from "./api";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

/**
 * Load branches from the server
 */
const saveSupplierPricing = async (data) => {
    const apiUrl = `${API_HOST}public/quotes/pricing`;
    try {
        // const response = await axios.put(apiUrl, data, {
        //     headers: { "Content-Type": "application/json" },
        //     timeout: 10000,
        //     withCredentials: true,
        // });
        const response = await axiosInstance.put(apiUrl, data, {
            headers: { "Content-Type": "application/json" },
            timeout: 10000,
        });

        if (response.status === 200) {
            return response.data.data;
        }
    } catch (error) {
        return null;
    }
};

export default saveSupplierPricing;