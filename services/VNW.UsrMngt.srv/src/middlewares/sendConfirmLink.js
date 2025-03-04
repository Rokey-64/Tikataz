
import emitLog, { level, showMessage } from '../services/fluentd-connection/fluentd-jack.js';
import mailSender from "../services/api-caller/index.js";
import createMailTemplate, { templateType, sendType } from '../services/emailTemplate/createEmailTemplate.js';
import { nanoid } from 'nanoid';
import getModelService from '../services/getModelService.js';
import generateJWT, { verifyJWT } from '../services/token-auths/index.js'
import setFeedback from '../services/setFeedback.js';

const HOST = process.env.CURRENT_SERVER_ADDRESS;
const PORT = process.env.PORT;

const sendConfirmLink = async (req, res, next) => {
    const model = getModelService(req);

    /**
     * Create a user ID
     * 
     * Description:
     * * The user ID is generated using the nanoid package. It has a length of 21 characters.
     */
    model.userID = nanoid();

    /** 
     * Generate a payload for the JWT
     * 
     * fields:
     * * userID - The user ID.
     * * email - The email of the user.
     * * userName - The username of the user.
     */
    const payload = {
        userID: model.userID,
        email: model.email,
        userName: model.userName,
    };

    /**
     * Generate a token
     * 
     * Fields:
     * * payload - The payload to sign.
     * * expiresIn - The expiration time of the token.
     */
    const JWT = await generateJWT(payload, '1h');

    /**
     * Generate the confirmation link
     * 
     * Fields:
     * * HOST - The host of the server.
     * * JWT - The JWT token.
     */
    const confirmKink = `http://${HOST}:${PORT}/signup/confirm?token=${JWT}`;

    /**
     * Send the OTP to the user
     * 
     * Fields:
     */
    try {
        const EMAIL_SEND_FAILED = 1001;
        const mailConfig = await createMailTemplate(templateType.link, req.id, model.email, confirmKink, model.lang);
        const resulf = await mailSender(mailConfig);

        if (resulf.status === 'failed') {
            if (resulf.error.code === EMAIL_SEND_FAILED) {
                return res.status(400).json(
                    setFeedback(
                        req.feedback,
                        false,
                        error.message,
                        { 
                            prevID: req.id,
                            userNotification: req.t('auths_mail_failed')
                        }
                    )
                );
            }
            throw new Error(resulf.error.message);
        }
    } catch (error) {
        emitLog(level.ERROR, req.id, error.message, 'Middleware|sendOTP|sendMail', { prevReqID: model.id, userID: model.userID });
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

export default sendConfirmLink;

