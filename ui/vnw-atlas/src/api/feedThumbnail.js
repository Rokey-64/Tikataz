import axios from "axios";
import axiosInstance from "./api";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

/**
 * Get a list of Cards to display in the Atlas page
 * @param {string} cid - The card ID to filter by (optional).
 * @param {string} ctype - The card type to filter by. [auto, manual]
 * @returns 
 */
const feedThumbnail = async (id) => {
    let apiUrl = `${API_HOST}public/atlas/thumbnails/${id}`;
    try {
        // const response = await axios.get(apiUrl,
        //     {
        //         responseType: 'blob',
        //         withCredentials: true
        //     }
        // );

        const response = await axiosInstance.get(apiUrl, {
            responseType: 'blob'
        });
        
        if (response.status === 200) {
            return response.data;
        }

    }
    catch (error) {
        return null;
    }
}

export default feedThumbnail;