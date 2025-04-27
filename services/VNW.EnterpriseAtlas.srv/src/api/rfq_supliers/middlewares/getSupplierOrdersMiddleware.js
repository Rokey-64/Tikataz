import getModelService from "../../../services/getModelService.js";
import setFeedback from "../../../services/setFeedback.js";
import mysqlConn from "../../../databases/mysql-jack.js";
import { QueryTypes } from "sequelize";
import { showMessage } from "../../../databases/http_fluentd.js";
import getRFQOrderService from "../services/getRFQOrderService.js";


/**
 * Get a list of currencies from the database and attach it to the request object.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const getSupplierOrdersMiddleware = async (req, res, next) => {
    const model = getModelService(req);
    try {
        const res = await getRFQOrderService(model.cid, model.oid);

        const items = JSON.parse(res[0].data.items);
        const orderInfo = JSON.parse(res[0].data.info);
        const statistics = JSON.parse(res[0].data.statistics);

        if (items === null || items.length === 0 || orderInfo === null || statistics === null) {
            return res.status(400).json(setFeedback(req.feedback, false));
        }

        model.payload = {
            items: items,
            info: orderInfo,
            statistics: statistics,
        };
    }
    catch (err) {
        showMessage("error", "Error getting currencies", err);
        return res.status(500).json(setFeedback(req.feedback, false));
    }

    return next();
}

export default getSupplierOrdersMiddleware;