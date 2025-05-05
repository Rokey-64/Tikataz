import { showMessage } from "#@/services/fluentd-connection/fluentd-jack.js";
import getModelService from "#@/services/getModelService.js";
import sessionService from "#@/services/sessionService.js";

/**
 * Insert the user information to the session
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const insertUserSession = async (req, res, next) => {
    const model = getModelService(req);
    const user = model.user;

    /**
     * Save the user information to the session
     * 
     * Fields:
     * * session - The session object.
     * * key - The key of the session.
     * * value - The value of the session.
     */
    await sessionService.setUserSession(req.session, 'user', user);

    return next();
}

export default insertUserSession;