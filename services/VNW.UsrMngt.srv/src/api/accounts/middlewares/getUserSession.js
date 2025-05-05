
import getModelService from "#@/services/getModelService.js";
import sessionService from "#@/services/sessionService.js";

/**
 * Import the user session to model from the request session
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const getUserSession = async (req, res, next) => {
    const model = getModelService(req);

    /**
     * Get the user session from the request session
     * 
     * Arguments:
     * 1. The request session (req.session) - The session of the request.
     * 2. The key of the session ('user') - The key of the session.
     */
    const user = await sessionService.getUserSession(req.session, 'user');

    /**
     * Save the user information to the model.
     * 
     */
    model.user = user;
    
    return next();
}

export default getUserSession;