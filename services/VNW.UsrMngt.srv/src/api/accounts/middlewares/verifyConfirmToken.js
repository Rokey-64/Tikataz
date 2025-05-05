
import { verifyJWT } from '#@/services/token-auths/index.js';
import getModelService from "#@/services/getModelService.js";
import setFeedback from "#@/services/setFeedback.js";
import { getRedisKey, deleteRedisKey } from "#@/services/db-connection/redis-jack.js";

// The token is invalid
const tokenInvalid = (req, res) => res.status(400).json(
    setFeedback(
        req.feedback,
        false,
        'The token is invalid',
        {
            prevID: req.id,
            userNotification: req.t('token_invalid')
        }
    )
);

/**
 * Verify the token
 * @param {string} uKey - The unique key for each route domain
 * @returns 
 */
const verifyConfirmToken = (uKey) => async (req, res, next) => {
    const model = getModelService(req);
    let payload;
    const token = model?.token;



    if (!token) return tokenInvalid(req, res);

    /**
     * Verify the token
     * 
     * Fields:
     * * token - The token to verify.
     * 
     * Returns:
     * * payload - The token payload.
     */
    try {
        payload = await verifyJWT(token);
    } catch (err) {
        return tokenInvalid(req, res);
    }

    // Check if the token is in the Redis
    try {
        const result = await getRedisKey(`confirm-token:${payload?.userID}:${payload?.did}`)
        if (!result) tokenInvalid(req, res);
    } catch (error) {
        return tokenInvalid(req, res);
    }

    // If uKey is not correct, return
    if (uKey && payload?.key !== uKey) return tokenInvalid(req, res);


    /**
     * Set the payload to the model
     * 
     * Fields:
     * * payload - The token payload.
     */
    model.payload = payload;

    // model.user = {userID: payload?.userID} ;
    // model.userID = payload?.userID;

    return next();
} 

export default verifyConfirmToken;