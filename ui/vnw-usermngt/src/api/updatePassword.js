// import from 'axios' and 'config' here
import axios from 'axios';
import 'dotenv/config';

const { VITE_API_HOST: host,
    VITE_API_PORT: port,
    VITE_PROTOCOL: protocol,
    VITE_ROOT_PATH: root_path } = import.meta.env;

export const updatePassword = async (data) => {
    try {
        const response = await axios.post(`${protocol}://${host}${root_path}/update-password`, data,
            {
                timeout: 30000,
                withCredentials: true,
            }
        );
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}