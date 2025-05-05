import { Router } from 'express';
import emitLog, { level, showMessage } from '#@/services/fluentd-connection/fluentd-jack.js';
import getModelService from '#@/services/getModelService.js';
import sessionService from '#@/services/sessionService.js';
import setFeedback from '#@/services/setFeedback.js';
import { deleteRedisKey } from '#@/services/db-connection/redis-jack.js';
import checkUsernameBeforeUpdate from '../validators/checkUsernameBeforeUpdate.js';
import checkRequiredFields from '../validators/checkRequiredFields.js';
import TkzRegException from '../exception/registerException.js';
import getUserFromID from '../middlewares/getUserFromID.js';
import sendOTP from '../middlewares/sendOTP.js';
import verifyOTP from '../middlewares/verifyOTP.js';
import verifyConfirmToken from '../middlewares/verifyConfirmToken.js';
import checkNewPassword from '../middlewares/checkNewPassword.js';
import resetPassword from '../middlewares/resetPasword.js';
import getUserSession from '../middlewares/getUserSession.js';
import createConfirmToken from '../middlewares/createConfirmToken.js';
import insertUserSession from '../middlewares/insertUserSession.js';
import removeRefreshTokens from '../middlewares/removeRefreshTokens.js';
import createResetPassOTP from '../middlewares/createResetPassOTP.js';

const router = Router();
const UKEY = 'RESET_PASSWORD';

/**
 * Check if the user is valid and return the user information
 * 
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const inspector = async (req, res, next) => {
    const model = getModelService(req);

    if (!checkRequiredFields(model, ['loginName'])) return res.status(400).json(
        setFeedback(
            req.feedback,
            false,
            'The required fields are not provided',
            {
                prevID: req.id,
                userNotification: req.t('address_empty')
            }
        )
    );
    if (!model.loginName) return res.status(400).json(
        setFeedback(
            req.feedback,
            false,
            'The login name is not provided',
            {
                prevID: req.id,
                userNotification: req.t('user_name_not_empty')
            }
        )
    );

    /**
     * Check and get the user information
     * 
     * Fields:
     * * loginName - The login name of the user.
     * 
     * return: The user object.
     * * isActivat - The status of the user.
     * * isNeedsOTP - whether the user needs OTP or not.
     * * kindOfOTP - The kind of OTP that the user needs. (email, sms)
     * * destination - The destination of the OTP. (email, phone number)
     * * nationCode - The nation code of the phone number.
     * * userID - The user ID.
     * 
     */
    const user = await checkUsernameBeforeUpdate(model.loginName).catch((err) => {
        if (err instanceof TkzRegException) {
            return res.status(400).json(
                setFeedback(
                    req.feedback,
                    false,
                    err.message,
                    {
                        prevID: req.id,
                        userNotification: req.t('user_not_found')
                    }
                )
            );
        }

        emitLog(level.ERROR, req.id, err.message, 'reset-pw/inspectorUserlogin | checkUsernameBeforeUpdate', { loginName: model.loginName });
        return res.status(500).json(
            setFeedback(
                req.feedback,
                false,
                'An error occurred while checking the user information',
                {
                    prevID: req.id,
                    userNotification: req.t('server_error')
                }
            )
        );
    });

    /**
     * Save the user information to the model
     * 
     * Fields:
     * * user - The user object.
     */
    model.user = user;

    return next();
}

/**
 * Send the OTP to reset the password
 * 
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * 
 * @returns
 */
router.post('/new-otp', inspector, createResetPassOTP, sendOTP, createConfirmToken(UKEY), insertUserSession, async (req, res, next) => {
    /**
     * This route handler expects a POST request body with the following structure:
     * 
     * {
     *   // Required fields
     *   id: <string> (Required) - The previous request ID.
     *   lang: <string> (Required) - The language of the user.
     *   did: <string> (Required) - The device ID of the user.
     *   loginName: <string> (Required) - The user login name of the user account.
     *   
     * }
     * 
     * Example request body:
     * 
     * {
     *   "id": "123456",
     *   "lang": 'vi',
     *   "did": "123456",
     *   "loginName": "goldtime604@gmail.com"
     * }
     */

    const model = getModelService(req);


    res.status(200).json(
        setFeedback(
            req.feedback,
            true,
            'OTP sent successfully',
            {
                prevID: req.id,
                userNotification: req.t('otp_sent'),
                token: model.user?.confirmToken
            }
        )
    );
});


router.get('/resend-otp', verifyConfirmToken(UKEY), getUserFromID, createResetPassOTP, sendOTP, insertUserSession, async (req, res, next) => {
    /**
     * This route handler expects a POST request body with the following structure:
     * 
     * {
     *   // Required fields
     *   token: <string> (Required) - The token that the user received.
     * 
     * Example request body:
     * 
     * {
     *   "token": "123456"
     * }
     */


    res.status(200).json(
        setFeedback(
            req.feedback,
            true,
            'OTP sent successfully',
            {
                prevID: req.id,
                userNotification: req.t('otp_sent')
            }
        )
    );
});

/**
 * Verify the OTP to reset the password
 * @param {*} otp - the OTP that the user received
 */
router.post('/verify-otp', verifyConfirmToken(UKEY), getUserSession, verifyOTP, async (req, res, next) => {
    /**
     * This route handler expects a POST request body with the following structure:
     * 
     * {
     *   // Required fields
     *   id: <string> (Required) - The previous request ID.
     *   lang: <string> (Required) - The language of the user.
     *   did: <string> (Required) - The device ID of the user.
     *   otp: <string> (Required) - The OTP that the user received.
     *   token: <string> (Required) - The token that the user received.
     * }
     * 
     * Example request body:
     * 
     * {
     *   "id": "123456",
     *   "lang": 'vi',
     *   "did": "123456",
     *   "otp": "123456"
     *   "token": "123456"
     * }
     */


    /**
     * Destroy the session
     * 
     * Fields:
     * * req.session - The session object.
     * 
     */
    sessionService.destroySession(req.session);

    const model = getModelService(req);
    res.status(200).json(
        setFeedback(
            req.feedback,
            true,
            'OTP verified successfully',
            {
                prevID: req.id,
                userNotification: req.t('otp_verified')
            }
        )
    );
});


/**
 * Reset the password
 * @param {*} password - the new password
 * @param {*} confirmPassword - confirm the new password
 * @param {*} token - the token that the user received
 */
router.post('/recover', verifyConfirmToken(UKEY), checkNewPassword, resetPassword, removeRefreshTokens, async (req, res, next) => {
    //Bổ sung: logout tất cả các thiết bị khác của user
    //

    /**
     * This route handler expects a POST request body with the following structure:
     * 
     * {
     *   // Required fields
     *   id: <string> (Required) - The previous request ID.
     *   lang: <string> (Required) - The language of the user.
     *   did: <string> (Required) - The device ID of the user.
     *   password: <string> (Required) - The new password.
     *   confirmPassword: <string> (Required) - The confirm password.
     *   token: <string> (Required) - The token that the user received.
     * }
     * 
     * Example request body:
     * 
     * {
     *   "id": "123456",
     *   "lang": 'vi',
     *   "did": "123456",
     *   "password": "password123",
     *   "confirmPassword": "password123",
     *   "token": "123456"
     * }
     */

    const model = getModelService(req);
    const payload = model?.payload;

    // If the token is in the Redis, try to delete it
    try {
        await deleteRedisKey(`confirm-token:${payload?.userID}:${payload.did}`);
    } catch (error) {
        emitLog(level.ERROR, req.id, error.message, 'reset-pw/resetPassword | deleteRedisKey', { userID: payload?.userID });
        return res.status(500).json(
            setFeedback(
                req.feedback,
                false,
                'The token is not deleted',
                {
                    prevID: req.id,
                    userNotification: req.t('server_error')
                }
            )
        );
    }

    // Return the response to the user that the password is reset successfully
    res.status(200).json(
        setFeedback(
            req.feedback,
            true,
            'Password reset successfully',
            {
                prevID: req.id,
                userNotification: req.t('password_updated')
            }
        )
    );
});

export default router;