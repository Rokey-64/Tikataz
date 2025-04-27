import getModelService from "../../../services/getModelService.js";
import setFeedback from "../../../services/setFeedback.js";
import { showMessage } from "../../../databases/http_fluentd.js";
import saveQuestionSettingService from "../services/saveQuestionSettingService.js";

/**
 * Saves the basic settings of the user.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 **/
const QuestionSavingMiddleware = async (req, res, next) => {
    const model = getModelService(req);

    if (!model?.answers?.length) {
        return res.status(400).json(setFeedback(req.feedback, false));
    }

    try {
        const result = await saveQuestionSettingService(req.userID, model.answers);
        if (result.length === 0) {
            return res.status(400).json(setFeedback(req.feedback, false));
        }

        if(result[0].status === 0) {
            return res.status(400).json(setFeedback(req.feedback, false));
        }
        
    } catch (error) {
        showMessage("QuestionSavingMiddleware", error);
        return res.status(500).json(setFeedback(req.feedback, false));
    }

    return next();
};

export default QuestionSavingMiddleware;