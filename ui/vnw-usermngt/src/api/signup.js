// import from 'axios' and 'config' here
import axios from 'axios';

const { VITE_API_HOST: host,
    VITE_API_PORT: port,
    VITE_PROTOCOL: protocol,
    VITE_ROOT_PATH: root_path } = import.meta.env;

export const requireForSignup = async (data) => {
    try {
        const res = await axios.post(`${protocol}://${host}${root_path}/signup`, data,
            {
                headers: {
                    'Content-Type': 'application/json',
                },

                timeout: 30000,
                withCredentials: true
            }
        );
        return res;
    } catch (error) {
        return error.response;
    }
}

// export const confirmTokenAndCreateAccount = async (data) => {
//     try {
//         const response = await axios.post(`${protocol}://${host}/signup/confirm`, data,
//             {
//                 timeout: 5000,
//             }
//         );
//         return response.data;
//     } catch (error) {
//         return error.response.data;
//     }
// }