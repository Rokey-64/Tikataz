import getModelService from "../../../services/getModelService.js";
import sessionService from "../../../services/session_control.js";
import setFeedback from "../../../services/setFeedback.js";

const createCardDataSession = async (req, res, next) => {
    const model = getModelService(req);
    const data = model.payload;
    if(!data) {
        return res.status(400).json(setFeedback(req.feedback, false));
    }

    // Store the data in the session
    await sessionService.setUserSession(req.session, 'cardData', data);

    next();

};

export default createCardDataSession;
