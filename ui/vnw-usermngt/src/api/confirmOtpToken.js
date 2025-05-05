import axios from 'axios';

const { REACT_APP_HOST: host,
    REACT_APP_PORT: port,
    REACT_APP_PROTOCOL: protocol,
    REACT_APP_ROOT_PATH: root_path } = process.env;

/**
 * Before redirecting to the next page to verify OTP code, the user must confirm the OTP token
 * @param {string} token 
 * @returns 
 */
export const confirmOtpToken = async (token, lang = "vi") => {
    try {
        const res = await axios.get(`${protocol}://${host}:${port}${root_path}/confirm-token?token=${token}&lang=${lang}`,
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