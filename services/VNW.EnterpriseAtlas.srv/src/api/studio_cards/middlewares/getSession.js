import getModelService from "../../../services/getModelService.js";
import setFeedback from "../../../services/setFeedback.js";
import sessionService from "../../../services/session_control.js";

/**
 * Session exist checking middleware
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const  getSession = async (req, res, next) => {
    const model = getModelService(req);
    const cardData = await sessionService.getUserSession(req.session, 'cardData');
    if (!cardData) {
        return res.status(400).json(setFeedback(req.feedback, false));
    }
    model.payload = cardData;
    next();
};

export default getSession;