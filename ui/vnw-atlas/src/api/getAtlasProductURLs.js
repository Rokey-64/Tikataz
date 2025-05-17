import axios from "axios";
import axiosInstance from "./api";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

/**
 * Get a list of Cards to display in the Atlas page
 * @param {string} cid - The card ID to filter by (optional).
 * @param {string} ctype - The card type to filter by. [auto, manual]
 * @returns 
 */
const getAtlasProductURLs = async ({cid, keys}) => {
    let apiUrl = `${API_HOST}public/atlas/products`;
    try {
        // const response = await axios.post(apiUrl, {cid, keys},
        //     {
        //         headers: { "Content-Type": "application/json" },
        //         timeout: 10000,
        //         withCredentials: true,
        //     }
        // );
        const response = await axiosInstance.post(apiUrl, {cid, keys},
            {
                headers: { "Content-Type": "application/json" },
                timeout: 10000,
            }
        );
        if (response.status === 200) {
            return response.data.data.payload;
        }

    }
    catch (error) {
        return null;
    }
}

export default getAtlasProductURLs;