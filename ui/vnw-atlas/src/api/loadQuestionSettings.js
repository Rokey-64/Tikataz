import axios from "axios";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

/**
 * Get a list of question settings
 * * @param {string} key - The key of the question settings to load - privacy, announce
 * @returns 
 */
const loadQuestionSettings = async (key) => {
    if (!key) 
        return null;

    const apiUrl = `${API_HOST}auths/settings/${key}`;
    try {
        const response = await axios.get(apiUrl, {
            withCredentials: true
        });
        if (response.status === 200) {
            return response.data.data;
        }
    }
    catch (error) {
        return null;
    }
};

export default loadQuestionSettings;