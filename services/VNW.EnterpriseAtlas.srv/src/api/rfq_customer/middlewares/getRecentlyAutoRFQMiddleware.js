import getModelService from "../../../services/getModelService.js";
import setFeedback from "../../../services/setFeedback.js";
import { showMessage } from "../../../databases/http_fluentd.js";
import getUncompleteRFQ from "../services/getUncompleteRFQ.js";

/**
 * Get the recently auto RFQ (Request for Quotation) data from the database
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const getRecentlyAutoRFQMiddleware = async (req, res, next) => {
    const model = getModelService(req);
    const userID = req.userID;
    const rfqID = model.id;
    const type = model.type;
    const payload = {
        rfqID: rfqID,
        userID: userID,
        type: type
    };

    try {
        const result = await getUncompleteRFQ(payload.userID, payload.rfqID, payload.type);

        model.payload = result;
    }
    catch (err) {
        showMessage("error", "Error getting recently auto RFQ", err);
        return res.status(400).json(setFeedback(req.feedback, false));
    }

    return next();
}


export default getRecentlyAutoRFQMiddleware;