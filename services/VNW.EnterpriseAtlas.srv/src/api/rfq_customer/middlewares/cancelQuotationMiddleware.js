import getModelService from "../../../services/getModelService.js";
import setFeedback from "../../../services/setFeedback.js";
import mysqlConn from "../../../databases/mysql-jack.js";
import { QueryTypes } from "sequelize";
import { showMessage } from "../../../databases/http_fluentd.js";
import rejectedQuoteService from "../services/rejectedQuoteService.js";


/**
 * Get the recently auto RFQ (Request for Quotation) data from the database
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const cancelQuotationMiddleware = async (req, res, next) => {
    const model = getModelService(req);
    const userID = req.userID;
    const orderID = model.id;
    const active = model.active;

    try {
        const result = await rejectedQuoteService(userID, orderID, active);

        if (result[0].status === 0) {
            return res.status(400).json(setFeedback(req.feedback, false));
        }
    }
    catch (err) {
        showMessage("cancelQuotationMiddleware",  err);
        return res.status(400).json(setFeedback(req.feedback, false));
    }

    return next();
}


export default cancelQuotationMiddleware;