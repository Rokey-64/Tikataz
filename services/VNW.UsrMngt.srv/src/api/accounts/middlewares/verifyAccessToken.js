import 'dotenv/config'
import generateJWT, { verifyJWT } from '#@/services/token-auths/index.js'
import jwt from "jsonwebtoken";
import getModelService from '#@/services/getModelService.js';
import setFeedback from '#@/services/setFeedback.js';




/**
 * Verify the access token
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const verifyAccessToken = async (req, res, next) => {
    const model = getModelService(req);
    const accessToken = req.cookies.accessToken;

    if (!accessToken) return res.status(400).json(
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
    const payload = await verifyJWT(accessToken).catch((err) => {
        if (err instanceof jwt.TokenExpiredError) {
            return next();
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
    });

    return res.status(200).json(
        setFeedback(
            req.feedback,
            true,
            'Access token verified',
            {
                prevID: req.id,
                userNotification: req.t('token_verified')
            }
        )
    );
};

export default verifyAccessToken;