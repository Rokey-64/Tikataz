import { now } from "sequelize/lib/utils";
import generateJWT from '#@/services/token-auths/index.js'
import getModelService from "#@/services/getModelService.js";
import setFeedback from "#@/services/setFeedback.js";

export const createAccessToken = async (req, res, next) => {
    const model = getModelService(req);
    const user = model.user;
    const refreshPayload = model.user.refreshPayload;

    /**
     * There is have a access token, skip this middleware
     */
    if(user.accessToken) return next();

    /**
     * Generate a payload
     * 
     * Fields:
     * * tokenID - The token ID.
     * * userID - The user ID.
     * * did - The device ID.
     * * type - The type of the token.
     * * issuedAt - The time when the token was issued.
     */
    const accessTokenPayload = {
        tokenID: refreshPayload.tokenID,
        userID: refreshPayload.userID,
        did: refreshPayload.did,
        type: 'access-token',
        issuedAt: now()
    };

    /**
     * Generate a accesstoken token
     * 
     * Arguments:
     * 1. The payload (payload) - The payload of the token.
     * 2. The expiration time (15 minutes) - The expiration time of the token.
     */
    const accessToken = await generateJWT(accessTokenPayload, '15 minutes');

    /**
     * Set the token to the user object
     * 
     * Arguments:
     * 1. The key (key) - The key to set the token.
     */
    model.user.accessToken = accessToken;
    
    return next();
};

export default createAccessToken;