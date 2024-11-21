import axios from 'axios';
import 'dotenv/config';

const { REACT_APP_HOST: host, REACT_APP_PORT: port, REACT_APP_PROTOCOL: protocol } = process.env;

export const logout = async () => {
    try {
        const response = await axios.post(`${protocol}://${host}:${port}/logout`,
            {
                timeout: 30000,
                withCredentials: true
            }
        );
        return response.data;
    } catch (error) {
        return error.response;
    }
}