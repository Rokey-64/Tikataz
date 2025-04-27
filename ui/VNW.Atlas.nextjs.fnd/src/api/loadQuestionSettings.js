import axios from "axios";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

/**
 * Get a list of question settings
 * @returns 
 */
const loadQuestionSettings = async (key) => {
    if (!key) 
        return null;

    const apiUrl = `${API_HOST}vmw/atlas/settings/${key}/find`;
    try {
        const response = await axios.get(apiUrl);
        if (response.status === 200) {
            return response.data.data;
        }
    }
    catch (error) {
        return null;
    }
};

export default loadQuestionSettings;