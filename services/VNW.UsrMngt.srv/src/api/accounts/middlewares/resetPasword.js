import { showMessage } from '#@/services/fluentd-connection/fluentd-jack.js';
import updatePassword from '../resositories/updatePassword.js';
import getModelService from '#@/services/getModelService.js';
import setFeedback from '#@/services/setFeedback.js';

/**
 * Update the password
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const resetPassword = async (req, res, next) => {
    const model = getModelService(req);

    /**
     * Get the payload of the token. The payload was got from the token in the previous middleware.
     * 
     * The payload of the token contains the following fields:
     * 
     * * tokenID - The token ID.
     * * userID - The user ID.
     * * type - The type of the token.
     * * issuedAt - The issued time of the token.
     */
    const payload = model.payload;

    /**
     * Update the new password of the user account in the database
     * 
     * Fields:
     * * userID - The user ID.
     * * password - The new password.
     * 
     */
    await updatePassword(payload.userID, model.password).catch((err) => {
        showMessage(err.message, 'reset-pw/resetPassword | SPUserUpdatePassword', { userID: payload.userID });
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

    return next();
}

export default resetPassword;