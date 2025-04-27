
import getModelService from "#@/services/getModelService.js";
import setFeedback from "#@/services/setFeedback.js";
import { showMessage } from "#@/databases/http_fluentd.js";
import updateReactionService from "../services/card_reaction/updateReactionService.js";

/**
 * Update user evaluation for a specific card
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const reactionMiddleware = async (req, res, next) => {
    const model = getModelService(req);
    if(!model.cid || !model.uid || !model.cid_type || !model.type) {
        return res.status(400).json(setFeedback(req.feedback, false));
    }

    try {
        await updateReactionService(model.cid, model.uid, model.cid_type, model.type);
    } catch (error) {
        showMessage("error", "userReactionService", error);
        res.status(500).json(setFeedback(req.feedback, false));
    }

    return next();
}

export default reactionMiddleware;