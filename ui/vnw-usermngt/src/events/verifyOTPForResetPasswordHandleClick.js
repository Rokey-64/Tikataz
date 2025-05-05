
import { verifyOTPBeforeChangePassword } from '../api/resetPassword';
import { v4 as uuidv4 } from 'uuid';
import getLang from '../services/getLang';

const userLanguage = getLang();

/**
 * Verify OTP code when user reset password. If OTP is correct, user will be redirected to home page.
 * @param {*} navigate 
 * @param {*} otp 
 */
const verifyOTPForResetPasswordHandleClick = async (navigate, otp, token) => {
    const body = {
        id: uuidv4(),
        lang: userLanguage,
        otp: otp,
        token: token
    }
    const res = await verifyOTPBeforeChangePassword(body)
    if (res?.status === 200) {
        navigate(`/pw-reset?tk=${token}`);
    }
}

export default verifyOTPForResetPasswordHandleClick; 