import axios from "axios";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

/**
 * Get a list of Cards to display in the Atlas page
 * @param {string} cid - The card ID to filter by (optional).
 * @param {string} ctype - The card type to filter by. [auto, manual]
 * @returns 
 */
const getAtlasURLByID = async (cid, id) => {
    let apiUrl = `${API_HOST}vmw/api/atlas/next/product/image?cid=${cid}&id=${id}`;
    try {
        const response = await axios.get(apiUrl);
        if (response.status === 200) {
            return response.data.data.url;
        }

    }
    catch (error) {
        return null;
    }
}

export default getAtlasURLByID;