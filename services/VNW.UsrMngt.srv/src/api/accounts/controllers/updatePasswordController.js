import { Router } from 'express';
import { hashPassword, verifyPassword, hashOTP } from '#@/services/password-hashing/index.js'
import setFeedback from '#@/services/setFeedback.js';
import emitLog from '#@/services/fluentd-connection/fluentd-jack.js';
import getModelService from '#@/services/getModelService.js';
import lookingCurrentPassword from '../resositories/lookingCurrentPassword.js';
import checkRequiredFields from '../validators/checkRequiredFields.js';
import resetPassword from '../middlewares/resetPasword.js';
import verifyAccessToken from '../middlewares/verifyAccessToken.js';
import checkNewPassword from '../middlewares/checkNewPassword.js';

const router = Router();
const UKEY = 'UPDATE_PASSWORD';

/**
 * Check the input data before updating the password
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const inspector = async (req, res, next) => {
    const model = getModelService(req);

    /**
     * A payload get from the access token
     * 
     * Fields:
     * * model.payload - The payload
     * * * userID - The user id
     * * * tokenID - The token ID
     * * * issuedAt - The time that the token was issued
     * * * type - The type of the token
     */
    const payload = model.payload;

    if (!checkRequiredFields(model, ['currentPassword', 'password', 'confirmPassword'])) 
        return res.status(400).json(
            setFeedback(
                req.feedback,
                false,
                'The required fields are not provided',
                { 
                    prevID: req.id,
                    userNotification: req.t('missing_field')
                }
            )
        );

    /**
     * Get the user by the user id
     * 
     * Fields:
     * * model.id - The user id
     */
    const user = await lookingCurrentPassword(payload.userID).catch((err) => {
        emitLog(level.ERROR, req.id, err.message, 'update-password/inspector | lookingCurrentPassword', { userID: payload.userID })
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

    if (!verifyPassword(model.currentPassword, user.hash_password)) 
        return res.status(400).json(
            setFeedback(
                req.feedback,
                false,
                'The current password is incorrect',
                { 
                    prevID: req.id,
                    userNotification: req.t('password_incorrect')
                }
            )
        );

    return next();
}

router.post('/', verifyAccessToken, inspector, checkNewPassword, resetPassword, async (req, res) => {
    /**
     * This route handler expects a POST request body with the following structure:
     * 
     * {
     *   // Required fields
     *   id: <string> (Required) - The previous request ID.
     *   lang: <string> (Required) - The language of the user.
     *   currentPassword: <string> (Required) - The current password
     *   password: <string> (Required) - The new password.
     *   confirmPassword: <string> (Required) - The confirm password.
     * }
     * 
     * Example request body:
     * 
     * {
     *   "id": "123456",
     *   "lang": 'vi',
     *   "password": "password123",
     *   "confirmPassword": "password123",
     * }
     */

    const model = getModelService(req);

    return res.status(200).json(
        setFeedback(
            req.feedback,
            true,
            'The password is updated',
            { 
                prevID: req.id,
                userNotification: req.t('password_updated')
            }
        )
    );
});

export default router;