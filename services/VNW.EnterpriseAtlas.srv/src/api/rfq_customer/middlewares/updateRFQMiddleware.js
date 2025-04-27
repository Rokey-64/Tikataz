import getModelService from "../../../services/getModelService.js";
import setFeedback from "../../../services/setFeedback.js";
import { showMessage } from "../../../databases/http_fluentd.js";
import createRFQOrderService from "../services/createRFQOrderService.js";

const updateRFQMiddleware = async (req, res, next) => {
    const model = getModelService(req);

    try {
        const result = await createRFQOrderService(req.userID, model.payload);

        const resultData = result[0];
        if (resultData.status !== 1) {
            showMessage("error", "Error updating RFQ", resultData.message);
            return res.status(400).json(setFeedback(req.feedback, false));
        }
    }
    catch (err) {
        showMessage("error", "Error updating RFQ", err);
        return res.status(400).json(setFeedback(req.feedback, false));
    }

    return next();
}

export default updateRFQMiddleware;