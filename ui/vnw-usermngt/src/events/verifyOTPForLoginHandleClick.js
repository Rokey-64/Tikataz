
import { loginWithOTP } from '../api/login';
import { v4 as uuidv4 } from 'uuid';
import getLang from '../services/getLang';

const userLanguage = getLang();

/**
 * Verify OTP code when user login. If OTP is correct, user will be redirected to home page.
 * @param {*} navigate 
 * @param {*} otp 
 */
const verifyOTPForLoginHandleClick = async (navigate, otp, token) => {
    const body = {
        id: uuidv4(),
        lang: userLanguage,
        otp: otp
    }
    const res = await loginWithOTP(body)
    if (res?.status === 200) {
        navigate('/home')
    }
}

export default verifyOTPForLoginHandleClick; 