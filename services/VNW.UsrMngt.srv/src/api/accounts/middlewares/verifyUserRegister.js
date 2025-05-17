
import { showMessage } from '#@/services/fluentd-connection/fluentd-jack.js'
import TkzRegException from "../exception/registerException.js";
import checkUserBeforeCreateAccount from "../validators/checkUserBeforeCreateAccount.js"
import checkRequiredFields from "../validators/checkRequiredFields.js";
import getModelService from '#@/services/getModelService.js';
import setFeedback from '#@/services/setFeedback.js';

const verifyUserRegister = async (req, res, next) => {
    const model = getModelService(req);

    /**
     * Check if the required fields are provided
     * 
     * Fields:
     */
    if (!checkRequiredFields(model, ['email', 'password', 'confirmPassword', 'userName', 'email'])) {
        return res.status(400).json(
            setFeedback(
                req.feedback,
                false,
                'The required fields are not provided',
                { 
                    prevID: req.id ,
                    userNotification: req.t('missing_field')
                }
            )
        );
    }

    /**
     * Check if the email and password is valid
     * 
     * Fields:
     * * model.email - The email of the user.
     * * model.password - The password of the user.
     * * model.confirmPassword - The confirm password of the user.
     * * model.userName - The user name of the user.
     * * model.email - The email of the user.
     */
    try {
        await checkUserBeforeCreateAccount(model);
    } catch (error) {
        if (error instanceof TkzRegException) return res.status(400).json(
            setFeedback(
                req.feedback,
                false,
                error.message,
                { 
                    prevID: req.id,
                    userNotification: error.message
                }
            )
        );

        showMessage(error.message, 'signup/register | inspector', { prevReqID: model.id, mail: model.email });
        return res.status(500).json(
            setFeedback(
                req.feedback,
                false,
                error.message,
                { 
                    prevID: req.id,
                    userNotification: req.t('server_error')
                }
            )
        );
    }


    return next();
}

export default verifyUserRegister;