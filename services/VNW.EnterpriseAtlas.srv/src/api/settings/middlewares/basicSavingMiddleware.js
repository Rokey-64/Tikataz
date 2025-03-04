import { QueryTypes } from "sequelize";
import mysqlConn from "../../../databases/mysql-jack.js";
import getModelService from "../../../services/getModelService.js";
import setFeedback from "../../../services/setFeedback.js";

/**
 * Saves the basic settings of the user.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const BasicSavingMiddleware = async (req, res, next) => {
    const model = getModelService(req);
    const userID = "dkebsheu1sed55a8wwd5+";

    if (!model?.theme.trim() || !model?.lang_id || !model?.timezone_id){
        return res.status(400).json(setFeedback(req.feedback, false, "Missing required fields", {}));
    }

    try {
        const result = await mysqlConn.query(`CALL spSaveSettingsBasic(:gUserID,:gTheme,:gLang_id,:gTimezone_id)`, {
            type: QueryTypes.RAW,
            replacements: {
                gUserID: userID,
                gTheme: model.theme,
                gLang_id: model.lang_id,
                gTimezone_id:model.timezone_id
            }
        });
    } catch (error) {
        return res.status(500).json(setFeedback(req.feedback, false, error.message, {}));
    }

    next();
};

export default BasicSavingMiddleware;