
import emitLog, { level, showMessage } from '#@/services/fluentd-connection/fluentd-jack.js';
import getModelService from '#@/services/getModelService.js';
import setFeedback from '#@/services/setFeedback.js';
import checkRequiredFields from "../validators/checkRequiredFields.js";
import lookingUserBeforeLogin from "../resositories/lookingUserBeforeLogin.js";

const fields = ['loginName', 'password'];

/**
 * This middleware gets the user from the database before login.
 * 
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const getLoginUser = async (req, res, next) => {
    const model = getModelService(req);
    if (!checkRequiredFields(model, fields)) return res.status(500).json(
        setFeedback(
            req.feedback,
            false,
            'The required fields are not provided',
            {
                prevID: req.id,
                userNotification: req.t('password_or_loginName_not_empty')
            }
        )
    );

    //setFeedback(req.feedback, 'error', 'Password or LoginName cannot empty', { prevID: req.id})
    if (!model.loginName || !model.password) return res.status(400).json(
        setFeedback(
            req.feedback,
            false,
            'Password or LoginName cannot empty',
            {
                prevID: req.id,
                userNotification: req.t('password_or_loginName_not_empty')
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
    try {
        model.user = await lookingUserBeforeLogin(model.loginName);
    }
    catch (err) {
        emitLog(level.ERROR, req.id, err.message, 'middleware/verifyUserAccount | lookingUserBeforeLogin', { prevReqID: model.id, loginName: model.loginName });
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
    }
    
    return next();
};

export default getLoginUser;