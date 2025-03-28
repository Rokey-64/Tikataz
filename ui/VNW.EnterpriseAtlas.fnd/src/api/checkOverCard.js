import axios from "axios";

const API_HOST = process.env.REACT_APP_API_HOST;

/**
 * API 
 * @returns 
 */
const checkOverCard = async () => {
    const apiUrl = `${API_HOST}vmw/me/card/check`;
    try {
        const response = await axios.get(apiUrl, {
            validateStatus: function (status) {
                return status < 500;
            }
        });
        return response;

    }
    catch (error) {
        return null;
    }
}

export default checkOverCard;