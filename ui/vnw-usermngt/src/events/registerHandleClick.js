import { requireForSignup } from '../api/signup';
import showMessage from '../services/showMessage';

/**
 * Login button click event
 * @param {*} e 
 */
const registerHandleClick = async (navigate, setContent, body) => {
    try {
        const res = await requireForSignup(body)
        if (res?.status === 200) {
            showMessage(res.data.data.userNotification);
            navigate('/login');
        }
        else {
            showMessage(res.data.data.userNotification);
            setContent(res.data.data.userNotification);
        }
    } catch (error) {
        showMessage();
    }
}
export default registerHandleClick;