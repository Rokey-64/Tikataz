// import from 'axios' and 'config' here
import axios from 'axios';

const { REACT_APP_HOST: host, REACT_APP_PORT: port, REACT_APP_PROTOCOL: protocol } = process.env;

export const requireForSignup = async (data) => {
    try {
        const res = await axios.post(`${protocol}://${host}:${port}/signup`, data,
            {
                headers: {
                    'Content-Type': 'application/json',
                },

                timeout: 30000,
            }
        );
        return res;
    } catch (error) {
        return error.response;
    }
}

// export const confirmTokenAndCreateAccount = async (data) => {
//     try {
//         const response = await axios.post(`${protocol}://${host}:${port}/signup/confirm`, data,
//             {
//                 timeout: 5000,
//             }
//         );
//         return response.data;
//     } catch (error) {
//         return error.response.data;
//     }
// }