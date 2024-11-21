
import emitLog, { level, showMessage } from '../services/fluentd-connection/fluentd-jack.js';
import mailSender from "../services/api-caller/index.js";
import createMailTemplate, { templateType, sendType } from '../services/emailTemplate/createEmailTemplate.js';
import getModelService from '../services/getModelService.js';
import setFeedback from '../services/setFeedback.js';


/**
 * Send the OTP to the user email
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const sendOTP = async (req, res, next) => {
    const model = getModelService(req);
    const user = model.user;

    /**
     * Configure the mail template and send the email
     * 
     * Arguments:
     * 1. The template type (templateType.otp) - The type of the email template.
     * 2. The request ID (req.id) - The ID of the request.
     * 3. The user email (user.email) - The email address of the user.
     * 4. The user content (user.content) - The content of the email.
     * 5. The language of the user (model.lang) - The language of the user.
     * 
     */
    try {
        const EMAIL_SEND_FAILED = 1001;
        const mailConfig = await createMailTemplate(templateType.otp, req.id, user.destination, user.otp.otp, model.lang);
        const resulf = mailSender(mailConfig);

        // if (resulf.status === 'failed') {
        //     if (resulf.error.code === EMAIL_SEND_FAILED) {
        //         return res.status(400).json(
        //             setFeedback(
        //                 req.feedback,
        //                 false,
        //                 resulf.error.message,
        //                 {
        //                     prevID: req.id,
        //                     userNotification: req.t('auths_mail_failed')
        //                 }
        //         ));
        //     }
        //     throw new Error(resulf.error.message);
        // }
    } catch (error) {
        emitLog(level.ERROR, req.id, error.message || 'send mail faild', 'Login/createOTP | sendMail', { prevReqID: model.id, userID: user.userID });
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

export default sendOTP;
