import getModelService from "../../../services/getModelService.js";
import setFeedback from "../../../services/setFeedback.js";
import mysqlConn from "../../../databases/mysql-jack.js";
import { QueryTypes } from "sequelize";
import { showMessage } from "../../../databases/http_fluentd.js";
import getRFQOrderService from "../services/getRFQOrderService.js";

/**
 * Get the order details to display in the request for quotation
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const orderDisplayInfoMiddleware =async (req, res, next) => {
    const model = getModelService(req);

    if(!model.id) {
        return res.status(400).json(setFeedback(req.feedback, false));
    }

    try {
        const result = await getRFQOrderService(req.userID, model.id);

        if(!result || result.length === 0) {
            return res.status(400).json(setFeedback(req.feedback, false));
        }

        model.payload = result;
    }
    catch (err) {
        showMessage("error", "Error get RFQ", err);
        return res.status(400).json(setFeedback(req.feedback, false));
    }

    return next();
}

export default orderDisplayInfoMiddleware;