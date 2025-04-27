import getModelService from "../../../services/getModelService.js";
import setFeedback from "../../../services/setFeedback.js";
import mysqlConn from "../../../databases/mysql-jack.js";
import { QueryTypes } from "sequelize";
import saveBranchService from "../services/saveBranchService.js";
import { showMessage } from "../../../databases/http_fluentd.js";

/**
 * This middleware is used to save the branch of the company
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const BranchSavingMiddleware = async (req, res, next) => {
    const model = getModelService(req);
    if (!model?.name?.trim() || !model?.address?.trim()) {
        return res.status(400).json(setFeedback(req.feedback, false));
    }

    try {
        const result = await saveBranchService({
            gid: model.id,
            uid: req.userID,
            name: model.name,
            taxcode: model.taxcode,
            date: model.date?.replace(/-/g, "") || "",
            phone: model.phone,
            email: model.email,
            address: model.address
        });

        if (result[0].status === 0) {
            showMessage(result[0].message);
            return res.status(400).json(setFeedback(req.feedback, false));
        }
    }
    catch (err) {
        showMessage("BranchSavingMiddleware", err);
        return res.status(500).json(setFeedback(req.feedback, false));
    }

    next();
};

export default BranchSavingMiddleware;