import { QueryTypes } from "sequelize";
import mysqlConn from "../../../databases/mysql-jack.js";
import getModelService from "../../../services/getModelService.js";
import setFeedback from "../../../services/setFeedback.js";
import deleteBranchService from "../services/deleteBranchService.js";
import { showMessage } from "../../../databases/http_fluentd.js";

/**
 * This middleware is used to delete the branch of the company
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const BranchDeletingMiddleware = async (req, res, next) => {
    const model = getModelService(req);

    if (!model?.ids || model.ids.length === 0) {
        return res.status(400).json(setFeedback(req.feedback, false));
    }
    const concatID = model.ids.join(',');

    try {
        const result = await deleteBranchService(req.userID, concatID);
        if (result[0].status === 0) {
            return res.status(400).json(setFeedback(req.feedback, false));
        }
    }
    catch (err) {
        showMessage("BranchDeletingMiddleware", err);
        return res.status(500).json(setFeedback(req.feedback, false));
    }

    next();
};

export default BranchDeletingMiddleware;