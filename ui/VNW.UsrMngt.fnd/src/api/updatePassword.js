// import from 'axios' and 'config' here
import axios from 'axios';
import 'dotenv/config';

const { REACT_APP_HOST: host, REACT_APP_PORT: port, REACT_APP_PROTOCOL: protocol } = process.env;

export const updatePassword = async (data) => {
    try {
        const response = await axios.post(`${protocol}://${host}:${port}/reset-password/update`, data,
            {
                timeout: 30000,
            }
        );
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}