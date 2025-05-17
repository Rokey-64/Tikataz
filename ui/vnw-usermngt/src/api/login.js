import axios from 'axios';

const { VITE_API_HOST: host,
    VITE_API_PORT: port,
    VITE_PROTOCOL: protocol,
    VITE_ROOT_PATH: root_path } = import.meta.env;
    

/**
 * User send request to server to require login
 * @param {*} body - an object contains loginName, password and meta data
 * 
 * 
 * body = {
 *    id: string = uuidv4(),
 *    lang: vi en
 *    deviceID: string = localStorage.getItem('device_id');
 *    email: string,
 *    password: string,
 *    
 * }
 * @returns 
 */
export const requireForLogin = async (body) => {
    try {
        const res = await axios.post(`${protocol}://${host}${root_path}/login`, body,
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
        return error.response;
    }
}

/**
 * If login require OTP, this function will be called
 * @param {*} body 
 * 
 * body = {
 *    otp: string //OTP code
 * }
 * 
 * 
 * @returns 
 */
export const loginWithOTP = async (body) => {
    try {
        const response = await axios.post(`${protocol}://${host}${root_path}/login/otp/verify`, body,
            {
                headers: {
                    'Content-Type': 'application/json',
                },

                timeout: 30000,
                withCredentials: true,
            }
        );
        return response;
    } catch (error) {
        return error.response;
    }
}

/**
 * Resend OTP code if user not receive OTP code
 * @param {*} token - token from server
 * 
 * 
 * */
export const resendOTP = async (token, lang='vi') => {
    try {
        const response = await axios.get(`${protocol}://${host}${root_path}/login/otp/resend?token=${token}&lang=${lang}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                },

                timeout: 30000,
                withCredentials: true,
            }
        );
        return response;
    } catch (error) {
        return error.response;
    }
}