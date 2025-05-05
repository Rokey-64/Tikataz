import { Router } from "express";
import sessionService from "#@/services/sessionService.js";
import getModelService from "#@/services/getModelService.js";
import setFeedback from "#@/services/setFeedback.js";
import getLoginUser from "../middlewares/getLoginUser.js";
import verifyLoginUser from '../middlewares/verifyLoginUser.js';
import createOTP from '../middlewares/createOTP.js';
import sendOTP from '../middlewares/sendOTP.js';
import verifyOTP from '../middlewares/verifyOTP.js';
import createRefreshToken from "../middlewares/createRefreshToken.js";
import createAccessToken from "../middlewares/createAccessToken.js";
import insertUserSession from "../middlewares/insertUserSession.js";
import getUserSession from "../middlewares/getUserSession.js";
import setCookies from "../middlewares/setCookies.js";
import verifyConfirmToken from "../middlewares/verifyConfirmToken.js";
import getUserFromID from "../middlewares/getUserFromID.js";
import createConfirmToken from "../middlewares/createConfirmToken.js";

const router = Router();
const UKEY = 'LOGIN';


router.post('/', getLoginUser, verifyLoginUser, insertUserSession, (req, res, next) => {
    /**
     * This route handler expects a POST request body with the following structure:
     * 
     * {
     *   // Required fields
     *   id: <string> (Required) - The previous request ID.
     *   lang: <string> (Required) - The language of the user.
     *   did: <string> (Required) - The device of the user.
     *   loginName: <string> (Required) - The user login name of the user account.
     *   password: <string> (Required) - The password of the user.
     * }
     * 
     * Example request body:
     * 
     * {
     *   "id": "123456",
     *   "lang": "vn",
     *   "did": "123456",
     *   "loginName": "goldtime604@gmail.com",
     *   "password": "password123"
     * }
     */

    const model = getModelService(req);
    if (model.user.isNeedsOTP) req.url = '/otp';
    else req.url = '/none-otp';

    return next();
});

router.post('/none-otp', getUserSession, createRefreshToken, createAccessToken, setCookies, (req, res) => {
    /**
     * Destroy the session
     * 
     * Fields:
     * * req.session - The session object.
     */
    sessionService.destroySession(req.session);

    res.status(200).json(
        setFeedback(
            req.feedback,
            true,
            'Logout successfully',
            {
                prevID: req.id,
                userNotification: req.t('login_success'),
                isNeedsOTP: false
            }
        )
    );
});

router.post('/otp', getUserSession, createOTP, sendOTP, createConfirmToken(UKEY), insertUserSession, async (req, res) => {
    const model = getModelService(req);

    res.status(200).json(
        setFeedback(
            req.feedback,
            true,
            'OTP sent',
            {
                prevID: req.id,
                userNotification: req.t('otp_sent'),
                isNeedsOTP: true,
                token: model.user?.confirmToken
            }
        )
    );
});

router.post('/otp/verify', getUserSession, verifyOTP, createRefreshToken, createAccessToken, setCookies, async (req, res) => {
    /**
     * This route handler expects a POST request body with the following structure:
     * 
     * {
     *   // Required fields
     *   id: <string> (Required) - The previous request ID.
     *   lang: <string> (Required) - The language of the user.
     *   otp: <string> (Required) - The OTP that the user received.
     * }
     * 
     * Example request body:
     * 
     * {
     *   "id": "123456",
     *   "lang": 'vi',
     *   "otp": "123456"
     * }
     */

    /**
     * Destroy the session
     * 
     * Fields:
     * * req.session - The session object.
     */
    sessionService.destroySession(req.session);
    res.status(200).json(
        setFeedback(
            req.feedback,
            true,
            'Login successfull!',
            {
                prevID: req.id,
                userNotification: req.t('login_success')
            }
        )
    );
});

router.get('/otp/resend', verifyConfirmToken(UKEY), getUserFromID, createOTP, sendOTP, insertUserSession, async (req, res) => {
    /**
     * This route handler expects a GET request with the following query parameters:
     * 
     * {
     *   // Required fields
     *   token: <string> (Required) - The token that the user received.
     * }
     * 
     * Example request body:
     * 
     * {
     *   "token": "dsfkjwierjskdf.sdfjhuweuasdfhjafs....djhfesdfsdffsf
     * }
     */

    res.status(200).json(
        setFeedback(
            req.feedback,
            true,
            'OTP sent',
            {
                prevID: req.id,
                userNotification: req.t('otp_sent')
            }
        )
    );
});


export default router;