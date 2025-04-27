import getModelService from "../../../services/getModelService.js";
import setFeedback from "../../../services/setFeedback.js";
import mysqlConn from "../../../databases/mysql-jack.js";
import { QueryTypes } from "sequelize";
import { showMessage } from "../../../databases/http_fluentd.js";
import updateSProfileService from "../services/updateSProfileService.js";

const updateProfileMiddleware = async (req, res, next) => {
    const model = getModelService(req);
    const payload = model.payload;

    if (payload.companyName === undefined
        || payload.taxCode === undefined
        || payload.address === undefined
        || payload.email === undefined
        || payload.phone === undefined) {
        return res.status(400).json(setFeedback(req.feedback, false, "Missing parameters"));
    }

    if (
        payload.companyName.trim() === ""
        || payload.taxCode.trim() === ""
        || payload.address.trim() === ""
        || payload.email.trim() === ""
        || payload.phone.trim() === "") {
        return res.status(400).json(setFeedback(req.feedback, false, "Missing parameters"));
    }

    try {
        const result = await updateSProfileService(model.cid, payload);
        if (result[0].status === 0) {
            return res.status(400).json(setFeedback(req.feedback, false));
        }
    }
    catch (err) {
        showMessage("error", "Error updating supplier profile", err.sql);
        return res.status(400).json(setFeedback(req.feedback, false));
    }

    return next();
}

export default updateProfileMiddleware;