import axios from "axios";
import axiosInstance from "./api";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

/**
 * Get a list of Cards to display in the Atlas page
 * * @param {string} uid - The user ID to filter by (optional).
 * @param {string} cid - The card ID to filter by (optional).
 * @param {string} ctype - The card type to filter by. [auto, manual]
 * @returns 
 */
const getAtlasCardPolicy = async (cid, ctype) => {
    let apiUrl = `${API_HOST}public/atlas/policy?ctype=${ctype}&cid=${cid}`;
    try {
        // const response = await axios.get(apiUrl, {
        //     withCredentials: true
        // });
        const response = await axiosInstance.get(apiUrl);
        if (response.status === 200) {
            return response.data.data.payload;
        }

    }
    catch (error) {
        return null;
    }
}

export default getAtlasCardPolicy;