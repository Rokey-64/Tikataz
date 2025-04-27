import getModelService from "../../../services/getModelService.js";
import setFeedback from "../../../services/setFeedback.js";
import saveBasicSettingService from "../services/saveBasicSettingService.js";
import { showMessage } from "../../../databases/http_fluentd.js";

/**
 * Saves the basic settings of the user.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const basicSavingMiddleware = async (req, res, next) => {
    const model = getModelService(req);

    if (!model?.theme.trim() || !model?.lang_id || !model?.timezone_id){
        return res.status(400).json(setFeedback(req.feedback, false));
    }

    try {
        const result = await saveBasicSettingService({
            uid: req.userID,
            theme: model.theme,
            lang: model.lang_id,
            timezone: model.timezone_id
        });
    } catch (error) {
        showMessage("BasicSavingMiddleware", error);
        return res.status(500).json(setFeedback(req.feedback, false));
    }

    return next();
};

export default basicSavingMiddleware;