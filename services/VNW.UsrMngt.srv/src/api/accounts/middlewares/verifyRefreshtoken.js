
import generateJWT, { verifyJWT } from '#@/services/token-auths/index.js'
import jwt from "jsonwebtoken";
import getModelService from '#@/services/getModelService.js';
import { genRFKey } from '#@/services/redis-template-key/index.js';
import { getRedisKey } from '#@/services/db-connection/redis-jack.js';
import setFeedback from '#@/services/setFeedback.js';


/**
 * Verify the access token
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const verifyRefreshToken = async (req, res, next) => {
    const model = getModelService(req);
    const refreshCookiesToken = req.cookies.refreshToken;

    if (!refreshCookiesToken) {
        return res.status(400).json("No refresh token");
    }

    /**
     * Verify the access token
     * 
     * return the payload if the access token is valid
     * Payload structure:
     * {
     *  tokenID: <string> - The token ID
     *  userID: <string> - The user ID
     *  type: <string> - The type of the token (access-token)
     *  issuedAt: <string> - The time that the token was issued
     * }
     */
    let refreshCookiesPayload;
    try {
        refreshCookiesPayload = await verifyJWT(refreshCookiesToken);
        if (!refreshCookiesPayload) {
            throw new Error("Invalid refresh token");
        }
    }
    catch (err) {
        return res.status(400).json("Invalid refresh token");
    }

    const key = genRFKey(refreshCookiesPayload.userID, refreshCookiesPayload.did);

    /**
     * Get the token from the redis
     * 
     * return the token if the token is valid
     */
    let refreshServerToken;
    try {
        refreshServerToken = await getRedisKey(key);
        if (!refreshServerToken) {
            throw new Error("Invalid refresh token");
        }
    }
    catch (err) {
        return res.status(400).json("Invalid refresh token");
    }


    /**
     * Verify the access token
     * 
     * return the payload if the access token is valid
     * Payload structure:
     * {
     *  tokenID: <string> - The token ID
     *  userID: <string> - The user ID
     *  type: <string> - The type of the token (access-token)
     *  issuedAt: <string> - The time that the token was issued
     * }
     */
    try {
        await verifyJWT(refreshServerToken)
    }
    catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
            return res.status(401).json(
                setFeedback(
                    req.feedback,
                    false,
                    'Access token expired',
                    {
                        prevID: req.id,
                        userNotification: req.t('token_expired')
                    }
                )
            );
        }
        return res.status(400).json(
            setFeedback(
                req.feedback,
                false,
                err.message,
                {
                    prevID: req.id,
                    userNotification: req.t('token_invalid')
                }
            )
        );
    }


    model.user = {
        ...model.user,
        refreshPayload: refreshCookiesPayload,
        userID: refreshCookiesPayload.userID,
    }
    return next();
};

export default verifyRefreshToken;