
import { showMessage } from '#@/services/fluentd-connection/fluentd-jack.js';
import getModelService from '#@/services/getModelService.js';
import setFeedback from '#@/services/setFeedback.js';
import checkRequiredFields from "../validators/checkRequiredFields.js";
import lookingUserBeforeLogin from "../resositories/lookingUserBeforeLogin.js";

/**
 * This middleware gets the user from the database before login.
 * 
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const getUserFromID = async (req, res, next) => {
    const model = getModelService(req);
    const userID = model?.userID || model?.payload?.userID;
    if (!userID) return res.status(400).json(
        setFeedback(
            req.feedback,
            false,
            'The user ID is not found',
            {
                prevID: req.id,
                userNotification: req.t('user_not_found')
            }
        )
    );
    

    /**
     * Get the user from the database before login.
     * 
     * The user is an object with the following structure:
     *  {
     *    isActive: <boolean> - The status of the user.
     *    needOTP: <boolean> - The status of the user.
     *    kindofOTP: <string> - The kind of OTP [email, sms, HOTP].
     *    destination: <string> - The destination of the OTP. [email, phone number, device].
     *    nationCode: <string> - The nation code of the user. [VN, US, ...].
     *    userID: <string> - The ID of the user.
     *    userPassword: <string> - The password of the user.
     * }
     * 
     * For example:
     * {
     *   isActive: true,
     *   isNeedsOTP: true,
     *   kindofOTP: 'email',
     *   destination: 'goldtime@gmal.com',
     *   nationCode: 'VN',
     *   userID: '123
     *   userPassword: 'password123'
     */
    const user = await lookingUserBeforeLogin(userID).catch((err) => {
        showMessage(err.message, 'middleware/verifyUserAccount | lookingUserBeforeLogin');
        return res.status(500).json(
            setFeedback(
                req.feedback,
                false,
                err.message,
                {
                    prevID: req.id,
                    userNotification: req.t('server_error')
                }
            )
        );
    });

    // Check if the user is active
    model.user = user;
    return next();
};

export default getUserFromID;