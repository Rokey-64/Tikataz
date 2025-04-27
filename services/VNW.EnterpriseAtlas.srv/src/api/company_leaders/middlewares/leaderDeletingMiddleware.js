import getModelService from "../../../services/getModelService.js";
import setFeedback from "../../../services/setFeedback.js";
import deleteLeaderService from "../services/deleteLeaderService.js";
import { showMessage } from "../../../databases/http_fluentd.js";

/**
 * This middleware is used to delete the branch of the company
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const LeaderDeletingMiddleware = async (req, res, next) => {
    const model = getModelService(req);

    if (!model?.id?.trim()) {
        return res.status(400).json(setFeedback(req.feedback, false));
    }

    try {
        const result = await deleteLeaderService(model.userID, model.id);

        if (result[0].status === 0) {
            return res.status(400).json(setFeedback(req.feedback, false));
        }
    }
    catch (err) {
        showMessage("LeaderDeletingMiddleware", err);
        return res.status(500).json(setFeedback(req.feedback, false));
    }

    next();
};

export default LeaderDeletingMiddleware;