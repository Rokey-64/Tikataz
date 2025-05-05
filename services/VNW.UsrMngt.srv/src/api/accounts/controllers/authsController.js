import { Router } from "express";
import jwt from "jsonwebtoken";
import verifyRefreshToken from "../middlewares/verifyRefreshtoken.js";
import createAccessToken from "../middlewares/createAccessToken.js";
import setFeedback from "#@/services/setFeedback.js";
import getModelService from "#@/services/getModelService.js";

import { verifyJWT } from '#@/services/token-auths/index.js';

const router = Router();
const UKEY = 'AUTHENTICATION';

const verifyRF = async (req, res, next) => {
    const refreshCookiesToken = req.cookies.refreshToken;

    if (!refreshCookiesToken) return res.status(400).end();

    /**
     * Check if the refresh token is valid
     * return the payload if the access token is valid
     */
    try{
        await verifyJWT(refreshCookiesToken)
    }
    catch (err) {
        return res.status(400).end();
    }

    return next();
}

const verifyAC = async (req, res, next) => {
    const accessCookiesToken = req.cookies.accessToken;

    if (!accessCookiesToken) return next();

    /**
     * Check if the access token is valid
     * return the payload if the access token is valid
     */
    try{
        await verifyJWT(accessCookiesToken);

        //* Check if the access token is expired
        return res.status(200).end();
    }
    catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
            return next();
        }

        return res.status(400).end();
    }

    return next();
}


router.post('/refresh', verifyRefreshToken, verifyAC, createAccessToken,  (req, res) => {
    const model = getModelService(req);
    

    /**
    * Set the access token to the cookies
    * 
    * Fields:
    * * model.user.accessToken - The access
    */
    res.cookie('accessToken', model.user.accessToken, {
        httpOnly: process.env.COOKIE_HTTP_ONLY === 'true', 
        secure: process.env.COOKIE_SECURE === 'true', 
        sameSite: process.env.COOKIE_SAME_SITE,
        maxAge: 15 * 60 * 1000, // 15'
        domain: process.env.COOKIE_DOMAIN
    });

    res.status(200).end();
});

router.get('/verify', verifyRF, (req, res) => {

    res.status(200).json(
        setFeedback(
            req.feedback,
            true,
            'Token reissued',
            {
                prevID: req.id,
                userNotification: req.t('token_refreshed')
            }
        )
    );
});

export default router;


