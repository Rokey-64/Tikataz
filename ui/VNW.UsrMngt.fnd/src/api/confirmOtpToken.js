import axios from 'axios';
import getLang from '../services/getLang';
import getDeviceIDSVC from '../services/getDeviceID';

const { REACT_APP_HOST: host, REACT_APP_PORT: port, REACT_APP_PROTOCOL: protocol } = process.env;

/**
 * Before redirecting to the next page to verify OTP code, the user must confirm the OTP token
 * @param {string} token 
 * @returns 
 */
export const confirmOtpToken = async (token) => {
    try {
        const res = await axios.get(`${protocol}://${host}:${port}/otp/cnf?token=${token}&lang=${getLang()}&deviceID=${getDeviceIDSVC()}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    // Các header khác nếu cần
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