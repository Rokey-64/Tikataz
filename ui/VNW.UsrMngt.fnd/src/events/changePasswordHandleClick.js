
import { changePassword } from '../api/resetPassword';
import showMessage from '../services/showMessage';

/**
 * Verify OTP code when user login. If OTP is correct, user will be redirected to home page.
 * @param {*} navigate 
 * @param {string} otp 
 * @param {string} token
 */
const changePasswordHandleClick = async (navigate, body) => {
    try {
        const res = await changePassword(body)
        showMessage(res.data.data.userNotification);

        if (res.status === 200) {
            navigate('/');
        }
    } catch (error) {
        showMessage('');
    }
}

export default changePasswordHandleClick; 