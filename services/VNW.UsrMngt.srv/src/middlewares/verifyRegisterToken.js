
import { verifyJWT } from '../services/token-auths/index.js';
import getModelService from "../services/getModelService.js";
import setFeedback from "../services/setFeedback.js";

/**
 * Verify the token
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const verifyRegisterToken = async (req, res, next) => {
    const model = getModelService(req);
    let payload;
    const token = model?.token;

    if (!token) return res.status(400).json(
        setFeedback(
            req.feedback,
            false,
            'The token is not found',
            {
                prevID: req.id,
                userNotification: req.t('token_invalid')
            }
        )
    );

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



    /**
     * Set the payload to the model
     * 
     * Fields:
     * * payload - The token payload.
     */
    model.payload = payload;

    next();
} 

export default verifyRegisterToken;