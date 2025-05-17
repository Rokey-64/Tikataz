import axios from "axios";
import axiosInstance from "./api";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

/**
 * Get a list of Cards to display in the Atlas page
 * @param {string} cid - The card ID to filter by (optional).
 * @param {string} ctype - The card type to filter by. [auto, manual]
 * @param {string} majs - The major AA01, AA02, AA03, etc. (optional).
 * @param {string} q - The search query to filter by (optional).
 * @param {number} p - The page number to ofset the results (optional).
 * @param {string} s - ssr or csr (optional).
 * @returns 
 */
const getAtlasCard = async (cid, ctype, majs = "", q = "", p = 1, s = "csr") => {
    let apiUrl = `${API_HOST}public/atlas/search`;

    try {
        // const response = await axios.get(apiUrl, {
        //     withCredentials: true
        // });
        const response = await axiosInstance.get(apiUrl, 
            {
                params: {
                    cid,
                    ctype,
                    majs,
                    q,
                    p,
                    s
                },
                withCredentials: true
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

export default getAtlasCard;