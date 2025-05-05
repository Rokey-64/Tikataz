import axios from 'axios';

const { REACT_APP_HOST: host,
    REACT_APP_PORT: port,
    REACT_APP_PROTOCOL: protocol,
    REACT_APP_ROOT_PATH: root_path } = process.env;
    

/**
 * Check if the user is logged in or not
 * @returns 
 */
const loginVerify = async () => {
    try {
        const res = await axios.get(`${protocol}://${host}:${port}${root_path}/auths/verify`,
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
