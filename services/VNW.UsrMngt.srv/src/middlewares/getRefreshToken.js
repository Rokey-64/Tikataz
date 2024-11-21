import jwt from "jsonwebtoken";
import emitLog, { level, showMessage } from '../services/fluentd-connection/fluentd-jack.js';
import { getRedisKey, deleteRedisKey, setRedisKey, setRedisKeyOveride } from "../services/db-connection/redis-jack.js";
import generateJWT, { verifyJWT } from '../services/token-auths/index.js';
import { genRFKey, genLoginOTPKey } from '../services/redis-template-key/index.js';
import getModelService from "../services/getModelService.js";
import setFeedback from "../services/setFeedback.js";

/**
 * Get the refresh token if it exists
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const getRefrestToken = async (req, res, next) => {
    const model = getModelService(req);
    const user = model.user;

    /**
     * If the refresh token exists, skip the process
     * 
     * Fields:
     * 1. refreshToken - The refresh token
     */
    if (user.refreshToken) return next();

    /**
     * Generate the key
     * 
     * Fields:
     * 1. user.userID - The user ID.
     */
    const key = genRFKey(user.userID, model.deviceID);

    /**
     * Get the token from the redis
     * 
     * Fields:
     * 1. key - The key to get the token.
     */
    const token = await getRedisKey(key).catch((err) => {
        emitLog(level.ERROR, req.id, err.message, 'Login/createRFJWT | getRedisKey', { userID: user.userID });
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

    if (!token) return next();

    /**
     * check if the refresh token has been created
     * 
     * Fields:
     * 1. token - The token to check.
     */
    try {
        user.refreshPayload = await verifyJWT(token);
    } catch (err) {
        if (!(err instanceof jwt.TokenExpiredError)) {
            emitLog(level.ERROR, req.id, err.message, 'Login/createRFJWT | verifyMailToken', { userID: user.userID });
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
        }
    }

    /**
     * Assign the token to the user
     * 
     * Fields:
     * 1. refreshToken - The token to assign.
     */
    user.refreshToken = token;

    return next();
};

export default getRefrestToken;