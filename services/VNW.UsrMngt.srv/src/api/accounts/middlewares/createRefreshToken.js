import { now } from "sequelize/lib/utils";
import { nanoid } from 'nanoid';
import emitLog, { level } from '#@/services/fluentd-connection/fluentd-jack.js';
import { setRedisKeyOveride } from "#@/services/db-connection/redis-jack.js";
import generateJWT from '#@/services/token-auths/index.js';
import { genRFKey} from '#@/services/redis-template-key/index.js';
import getModelService from "#@/services/getModelService.js";
import setFeedback from "#@/services/setFeedback.js";

const createRefreshToken = async (req, res, next) => {
    const model = getModelService(req);
    const user = model.user;
    
    /**
     * There is have a refresh token, skip this middleware
     */
    if(user.refreshToken) return next();

    /**
     * Create a device ID for browser
     */
    const did = nanoid();

    /**
     * Generate the key
     */
    const key = genRFKey(user.userID, did);
   

    /**
     * Generate a payload
     * 
     * Fields:
     * * tokenID - The token ID.
     * * userID - The user ID.
     * * type - The type of the token.
     * * issuedAt - The time when the token was issued.
     */
    const payload = {
        tokenID: nanoid(),
        userID: user.userID,
        type: 'refresh-token',
        did: did,
        issuedAt: now().toString()
    };

    /**
     * Generate a token
     * 
     * Arguments:
     * 1. The payload (payload) - The payload of the token.
     * 2. The expiration time (60 days) - The expiration time of the token.
     */
    const token = await generateJWT(payload, '60 days');

    /**
     * Set the token to the redis
     * 
     * Arguments:
     * 1. The key (key) - The key to set the token.
     * 2. The token (token) - The token to set.
     * 3. The expiration time (null) - The expiration time of the token.
     */
    try {
        await setRedisKeyOveride(key, token, 60*60*24*60);
    } catch (error) {
        emitLog(level.ERROR, req.id, err.message, 'MiddleWare/createLoginRefreshToken | setRedisKey', { userID: user.userID});
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

    /**
     * Set the token to the user object
     * 
     * Fields:
     * * refreshToken - The refresh token.
     */
    user.refreshToken = token;
    user.refreshPayload = payload;
    
    return next();
};

export default createRefreshToken;