// import from 'axios' and 'config' here
import axios from 'axios';

const { VITE_API_HOST: host,
    VITE_API_PORT: port,
    VITE_PROTOCOL: protocol,
    VITE_ROOT_PATH: root_path } = import.meta.env;

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
        const response = await axios.post(`${protocol}://${host}${root_path}/rs/new-otp`, body,
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
export const resendOTPForChangePassword = async (token, lang='vi') => {
    try {
        const response = await axios.get(`${protocol}://${host}${root_path}/rs/resend-otp?token=${token}&lang=${lang}`,
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
        const response = await axios.post(`${protocol}://${host}${root_path}/rs/verify-otp`, body,
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
        const response = await axios.post(`${protocol}://${host}${root_path}/rs/recover`, body,
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


