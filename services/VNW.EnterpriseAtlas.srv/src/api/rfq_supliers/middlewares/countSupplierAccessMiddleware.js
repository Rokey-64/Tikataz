import getModelService from "../../../services/getModelService.js";
import setFeedback from "../../../services/setFeedback.js";
import mysqlConn from "../../../databases/mysql-jack.js";
import { QueryTypes } from "sequelize";
import { showMessage } from "../../../databases/http_fluentd.js";
import trackingAccessService from "../services/trackingAccessService.js";


/**
 * Mark the number of times the supplier accessed the RFQ link
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const countSupplierAccessMiddleware = async (req, res, next) => {
    const model = getModelService(req);
    
    try{
        const result = await trackingAccessService(model.uid, model.oid);
        if (result[0].status === 0) {
            return res.status(400).json(setFeedback(req.feedback, false));
        }
    }
    catch (err) {
        showMessage("error", "Error updating supplier profile", err.sql);
        return res.status(500).json(setFeedback(req.feedback, false));
    }

    return next();
}

export default countSupplierAccessMiddleware;