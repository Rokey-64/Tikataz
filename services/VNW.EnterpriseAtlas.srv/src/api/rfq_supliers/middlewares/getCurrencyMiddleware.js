import getModelService from "../../../services/getModelService.js";
import setFeedback from "../../../services/setFeedback.js";
import mysqlConn from "../../../databases/mysql-jack.js";
import { QueryTypes } from "sequelize";
import { showMessage } from "../../../databases/http_fluentd.js";
import getCurrencyService from "../services/getCurrencyService.js";


/**
 * Get a list of currencies from the database and attach it to the request object.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const getCurrencyMiddleware = async (req, res, next) => {
    const model = getModelService(req);
    try{
        const result = await getCurrencyService();
        model.payload = result;
    }
    catch (err) {
        showMessage("error", "Error getting currencies", err);
        return res.status(400).json(setFeedback(req.feedback, false));
    }

    return next();
}

export default getCurrencyMiddleware;