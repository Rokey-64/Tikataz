
import { resendOTP } from '../api/login';
import { resendOTPForChangePassword } from '../api/resetPassword';
import showMessage from '../services/showMessage';


/**
 * When user login and don't receive OTP, this function will be called to resend OTP for login
 * @param {*} e 
 */
const onLoginResendOTPHandle = (token, lang='vi') => {
    const handle = (e) => {
        e.preventDefault();

        // Call API to resend code
        const resend = async () => {
            try {
                const res = await resendOTP(token, lang)
                showMessage(res.data.data.userNotification)
            } catch (error) {
                showMessage();
            }
        }

        resend();
    }

    return handle;
}

/**
 * When user reset password and don't receive OTP, this function will be called to resend OTP for reset password
 * @param {*} e 
 */
const onResetPasswordResendOTPHandle = (token, lang) => {
    const handle = (e) => {
        e.preventDefault();

        // Call API to resend code
        const resend = async () => {
            try {
                const res = await resendOTPForChangePassword(token, lang)
                showMessage(res.data.data.userNotification)
            } catch (error) {
                showMessage();
            }
        }

        resend();
    }

    return handle;
}

/**
 * Resend OTP code if user not receive OTP code
 * @param {*} key - Key to identify which function should be called. 
 * 
 * key ['login', 'resetPassword']
 * 
 * @returns an event handler function that will be called when user click resend OTP button
 */
const resendOTPHandleClick = (token, key, lang) => {
    switch (key) {
        case 'login':
            return onLoginResendOTPHandle(token, lang);
        case 'resetPassword':
            return onResetPasswordResendOTPHandle(token, lang);
    }
}

export default resendOTPHandleClick;