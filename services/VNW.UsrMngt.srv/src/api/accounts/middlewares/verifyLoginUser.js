
import { hashPassword, verifyPassword, hashOTP } from '#@/services/password-hashing/index.js'
import emitLog, { level, showMessage } from '#@/services/fluentd-connection/fluentd-jack.js';
import checkRequiredFields from "../validators/checkRequiredFields.js";
import getModelService from '#@/services/getModelService.js';
import setFeedback from '#@/services/setFeedback.js';

const fields = ['loginName', 'password'];

/**
 * Verify the user account
 * 
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const verifyLoginUser = async (req, res, next) => {
    const model = getModelService(req);

    if (!checkRequiredFields(model, fields)) return res.status(400).json(
        setFeedback(
            req.feedback,
            false,
            'The required fields are missing.',
            {
                prevID: req.id,
                userNotification: req.t('missing_field')
            }
        )
    );
    
    if (!model.loginName || !model.password) return res.status(400).json(
        setFeedback(
            req.feedback,
            false,
            'Password or LoginName cannot empty',
            {
                prevID: req.id,
                userNotification: req.t('password_or_loginName_not_empty')
            }
    ));

    /**
     * Verify the password
     * 
     * Fields:
     * * password - The password to verify.
     * * hashedPassword - The password to compare.
     */
    try{
        const isMatch = await verifyPassword(model.password, model.user.userPassword);

        if (!isMatch) return res.status(400).json(
            setFeedback(
                req.feedback,
                false,
                'Password is incorrect.',
                {
                    prevID: req.id,
                    userNotification: req.t('password_or_LoginName_not_valid')
                }
            )
        );
    
        return next();
    }
    catch(err){
        emitLog(level.ERROR, req.id, err.message, 'middleware/verifyUserAccount  | verifyPassword', { prevReqID: model.id, loginName: model.loginName });
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
};

export default verifyLoginUser;