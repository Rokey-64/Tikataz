import axios from 'axios';

const { VITE_API_HOST: host,
    VITE_API_PORT: port,
    VITE_PROTOCOL: protocol,
    VITE_ROOT_PATH: root_path } = import.meta.env;

/**
 * Before redirecting to the next page to verify OTP code, the user must confirm the OTP token
 * @param {string} token 
 * @returns 
 */
export const confirmOtpToken = async (token, lang = "vi") => {
    try {
        const res = await axios.get(`${protocol}://${host}${root_path}/confirm-token?token=${token}&lang=${lang}`,
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