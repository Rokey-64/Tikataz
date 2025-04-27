import getModelService from "../../../services/getModelService.js";
import setFeedback from "../../../services/setFeedback.js";
import { showMessage } from "../../../databases/http_fluentd.js";
import getItemHistoryService from "../services/getItemHistoryService.js";

/**
 * Find item history list for the request for quotation (RFQ) process
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const findItemHistoryMiddleware = async (req, res, next) => {
    const model = getModelService(req);
    const search = model.search || '';

    try {
        const result = await getItemHistoryService(req.userID, search);

        model.payload = result;
    }
    catch (err) {
        showMessage("error", "Error finding item history", err);
        return res.status(400).json(setFeedback(req.feedback, false));
    }

    return next();
}

export default findItemHistoryMiddleware;