// import from 'axios' and 'config' here
import axios from 'axios';
import getLang from '../services/getLang';
import getDeviceIDSVC from '../services/getDeviceID';

const { REACT_APP_HOST: host, REACT_APP_PORT: port, REACT_APP_PROTOCOL: protocol } = process.env;
const lang = getLang();

/**
 * When user forget password, this function will be called to send OTP to user's email
 * @param {*} body 
 * 
 * body = {
 *   id: string,
 *   lang: string,
 *   deviceID: string,
 *   loginName: string
 * }
 * 
 * @returns 
 */
export const requireOTPForChangePassword = async (body) => {
    try {
        const response = await axios.post(`${protocol}://${host}:${port}/reset-password/recover/new-otp`, body,
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
 * When user don't receive OTP, this function will be called to resend OTP
 * 
 * @param {*} token - token for reset password
 * @returns 
 */
export const resendOTPForChangePassword = async (token) => {
    alert('resendOTPForChangePassword');
    try {
        const response = await axios.get(`${protocol}://${host}:${port}/reset-password/recover/resend-otp?token=${token}&lang=${lang}&deviceID=${getDeviceIDSVC()}`,
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
 * When user input OTP, this function will be called to verify OTP
 * @param {*} body 
 * 
 * body = {
 *  id: string,
 *  lang: string,
 *  deviceID: string,
 *  otp: string,
 *  token: string
 * }
 * @returns 
 */
export const verifyOTPBeforeChangePassword = async (body) => {
    try {
        const response = await axios.post(`${protocol}://${host}:${port}/reset-password/recover/verify-otp`, body,
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
 * Update new password for user to database after user input new password
 * @param {*} body 
 * 
 * body = {
 *   id: string,
 *   lang: string,
 *   deviceID: string,
 *   token: string,
 *   newPassword: string
 *   confirmPassword: string
 * }
 * @returns 
 */
export const changePassword = async (body) => {
    try {
        const response = await axios.post(`${protocol}://${host}:${port}/reset-password/recover/`, body,
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
        return error?.response;
    }
}


