import { requireOTPForChangePassword} from '../api/resetPassword';
import showMessage from '../services/showMessage';

/**
 * Login button click event
 * @param {*} e 
 */
const forgotPasswordHandleClick = async (navigate, setContent, body) => {
    try {
        const res = await requireOTPForChangePassword(body)

        if (res.status === 200) {
            // navigate to OTP page
            navigate(`/reset-otp?tk=${res.data.data.token}&k=resetPassword`);
        }
        else {
            console.log(res);
            alert(res.data.data.userNotification);
            setContent(res.data.data.userNotification);
        }
    } catch (error) {
        showMessage();
    }
}
export default forgotPasswordHandleClick;