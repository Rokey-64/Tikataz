import emitLog, { level, showMessage } from '../services/fluentd-connection/fluentd-jack.js';
import checkPasswordBeforeUpdate from '../validators/checkPasswordBeforeUpdate.js';
import checkRequiredFields from '../validators/checkRequiredFields.js';
import getModelService from '../services/getModelService.js';
import checkPassworSyntax from '../validators/checkPassworSyntax.js';
import setFeedback from '../services/setFeedback.js';

/**
 * Check if the new password is valid
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const checkNewPassword = async (req, res, next) => {
    const model = getModelService(req);

    if (!checkRequiredFields(model, ['password', 'confirmPassword'])) 
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
     * Check if the password and confirm password are the same
     * 
     * Fields:
     * * password - The new password.
     * * confirmPassword - The confirm password.
     */
    if (model?.password !== model?.confirmPassword) 
        return res.status(400).json(
            setFeedback(
                req.feedback,
                false,
                'The password and confirm password are not the same',
                { 
                    prevID: req.id,
                    userNotification: req.t('password_not_match')
                }
            )
        );

    /**
     * Check the password syntax
     * 
     * Fields:
     * * model - The model
     * ** model.password - The password
     * ** model.confirmPassword - The confirm password
     */
    await checkPassworSyntax(model).catch((err) => {
        return res.status(400).json(
            setFeedback(
                req.feedback,
                false,
                'The password syntax is invalid',
                { 
                    prevID: req.id,
                    userNotification: req.t('password_too_week')
                }
            )
        );
    });

    /**
     * Check if the password is the same as the previous password
     * 
     * Fields:
     * * userID - The user ID.
     * * password - The new password.
     * 
     * return: Whether the password is the same as the previous
     * * true - The password is the same as the previous.
     * * false - The password is not the same as the previous.
     */
    const check = await checkPasswordBeforeUpdate(model.payload.userID, model.password).catch((err) => {
        emitLog(level.ERROR, req.id, err.message, 'reset-pw/resetPassword | checkPasswordBeforeUpdate', { userID: payload.userID });
        return res.status(500).json(
            setFeedback(
                req.feedback,
                false,
                'Failed to check the password',
                { 
                    prevID: req.id,
                    userNotification: req.t('server_error')
                }
            )
        );
    });

    /**
     * If the password is the same as the previous, return an error message.
     * 
     * Fields:
     * * message - The error message.
     */
    if (!check) return res.status(400).json(
        setFeedback(
            req.feedback,
            false,
            'The password is the same as the previous password',
            { 
                prevID: req.id,
                userNotification: req.t('password_not_use_again')
            }
        )
    );

    return next();

}

export default checkNewPassword;