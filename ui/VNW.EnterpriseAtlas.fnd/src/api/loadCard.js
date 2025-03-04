import axios from "axios";

const API_HOST = process.env.REACT_APP_API_HOST;

/**
 * Get the card data from the server
 * @returns 
 */
const loadCard = async () => {
    try {
        const res = await axios.get(`${API_HOST}vmw/me/card/init`);
        
        if (res.status !== 200) 
            return null;

        return res.data.data;
    } catch (error) {
        return null;
    }
};

export default loadCard;