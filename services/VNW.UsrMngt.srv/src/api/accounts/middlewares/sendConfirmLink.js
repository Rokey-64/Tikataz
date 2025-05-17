
import { showMessage } from '#@/services/fluentd-connection/fluentd-jack.js';
import mailSender from "#@/services/api-caller/index.js";
import createMailTemplate, { templateType, sendType } from '#@/services/emailTemplate/createEmailTemplate.js';
import { nanoid } from 'nanoid';
import getModelService from '#@/services/getModelService.js';
import generateJWT, { verifyJWT } from '#@/services/token-auths/index.js'
import setFeedback from '#@/services/setFeedback.js';

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
     * * did - The device ID of the user.
     */
    const payload = {
        userID: model.userID,
        email: model.email,
        userName: model.userName,
        did: nanoid()
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
    const confirmKink = `${process.env.USER_SERVER_DOMAIN}/api/v1/accounts/confirm/signup?token=${JWT}`;

    /**
     * Send the OTP to the user
     * 
     * Fields:
     */
    try {
        if (process.env.NODE_ENV === 'development') {
            showMessage('Confirm link: ', confirmKink);
        }
        else {
            const mailConfig = await createMailTemplate(templateType.link, req.id, model.email, confirmKink, model.lang);
            await mailSender(mailConfig);
        }

    } catch (error) {
        showMessage(error.message, 'Middleware|sendOTP|sendMail', { prevReqID: model.id, userID: model.userID });
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

