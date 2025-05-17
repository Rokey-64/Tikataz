import axios from 'axios';

const { VITE_API_HOST: host,
    VITE_API_PORT: port,
    VITE_PROTOCOL: protocol,
    VITE_ROOT_PATH: root_path } = import.meta.env;
    

/**
 * Check if the user is logged in or not
 * @returns 
 */
const loginVerify = async () => {
    try {
        const res = await axios.get(`${protocol}://${host}${root_path}/auths/verify`,
            {
                headers: {
                    'Content-Type': 'application/json',
                },

                timeout: 30000,
                withCredentials: true,
            }
        );
        return res;
    } catch (error) {
        throw error;
    }
}

export default loginVerify;
