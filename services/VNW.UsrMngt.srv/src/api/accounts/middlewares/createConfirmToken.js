import { now } from "sequelize/lib/utils";
import generateJWT, { verifyJWT } from '#@/services/token-auths/index.js'
import { nanoid } from "nanoid";
import getModelService from "#@/services/getModelService.js";
import {setRedisKeyOveride} from "#@/services/db-connection/redis-jack.js";
import {showMessage} from "#@/services/fluentd-connection/fluentd-jack.js";
import setFeedback from "#@/services/setFeedback.js";

/**
 * Create a confirm token for each page
 * @param {string} uKey - The unique key for each route domain
 * @returns 
 */
export const createConfirmToken = (uKey) => async (req, res, next) => {
    const model = getModelService(req);
    const user = model.user;
    const { userID } = user;
    if (!userID) return res.status(400).json(
        setFeedback(
            req.feedback,
            false,
            'The user ID is not provided',
            {
                prevID: req.id,
                userNotification: req.t('missing_field')
            }
        )
    );

    /**
     * Create a device ID for each page
     */
    const did = nanoid();

    /**
     * Generate a payload
     * 
     * Fields:
     * * tokenID - The token ID.
     * * userID - The user ID.
     * * type - The type of the token.
     * * did - The device ID.
     * * key - The unique key for each route domain
     * * issuedAt - The time when the token was issued.
     */
    const confirmTokenPayload = {
        tokenID: nanoid(),
        userID: userID,
        type: 'confirm-token',
        did: did,
        key: uKey,
        issuedAt: now()
    };

    /**
     * Generate a accesstoken token
     * 
     * Arguments:
     * 1. The payload (payload) - The payload of the token.
     * 2. The expiration time (15 minutes) - The expiration time of the token.
     */
    const confirmToken = await generateJWT(confirmTokenPayload, '15 minutes');

    await setRedisKeyOveride(`confirm-token:${userID}:${did}`, confirmToken, 60*15).catch(err => {
        showMessage(err.message, 'MiddleWare/createConfirmToken | setRedisKey');
        return res.status(500).json(
            setFeedback(
                req.feedback,
                false,
                'The token is not set',
                {
                    prevID: req.id,
                    userNotification: req.t('server_error')
                }
            )
        );
    });

    /**
     * Set the token to the user object
     * 
     * Arguments:
     * 1. The key (key) - The key to set the token.
     */
    user.confirmToken = confirmToken;
    
    return next();
};

export default createConfirmToken;