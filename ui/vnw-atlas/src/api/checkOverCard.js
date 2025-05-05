import axios from "axios";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

/**
 * API 
 * @returns 
 */
const checkOverCard = async () => {
    const apiUrl = `${API_HOST}auths/cards/verify`;
    try {
        const response = await axios.get(apiUrl, {
            validateStatus: function (status) {
                return status < 500;
            },
            withCredentials: true
        });
        return response;

    }
    catch (error) {
        return null;
    }
}

export default checkOverCard;