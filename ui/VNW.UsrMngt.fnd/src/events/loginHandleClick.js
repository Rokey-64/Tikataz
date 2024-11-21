import { requireForLogin } from '../api/login';
import showMessage from '../services/showMessage';

/**
 * Login button click event
 * @param {*} e 
 */
const signinHandleClick = async (navigate, setContent, body) => {
    try {
        const res = await requireForLogin(body)
        if (res.status === 200) {
            if (res.data.data?.isNeedsOTP) {

                // navigate to OTP page when needs OTP confirmation
                navigate(`/login-otp?tk=${res?.data?.data?.token}&k=login`);

            }
            else {
                // navigate to home page when login success
                navigate('/home');
            }
        }
        else {
            showMessage(res.data.data.userNotification);
            setContent(res.data.data.userNotification);
        }
    } catch (error) {
        showMessage();
    }
}
export default signinHandleClick;