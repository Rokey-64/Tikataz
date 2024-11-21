import axios from 'axios';
import getLang from '../services/getLang';
import getDeviceIDSVC from '../services/getDeviceID';

const { REACT_APP_HOST: host, REACT_APP_PORT: port, REACT_APP_PROTOCOL: protocol } = process.env;
const userLanguage = getLang();

/**
 * User send request to server to require login
 * @param {*} body - an object contains loginName, password and meta data
 * 
 * 
 * body = {
 *    id: string = uuidv4(),
 *    lang: string = getLang(),
 *    deviceID: string = localStorage.getItem('device_id');
 *    email: string,
 *    password: string,
 *    
 * }
 * @returns 
 */
export const requireForLogin = async (body) => {
    try {
        const res = await axios.post(`${protocol}://${host}:${port}/login`, body,
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
        const response = await axios.post(`${protocol}://${host}:${port}/login/otp/verify`, body,
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
export const resendOTP = async (token) => {
    try {
        const response = await axios.get(`${protocol}://${host}:${port}/login/otp/resend?token=${token}&lang=${userLanguage}&deviceID=${getDeviceIDSVC()}`,
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