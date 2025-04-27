import getModelService from "../../../services/getModelService.js";
import setFeedback from "../../../services/setFeedback.js";
import saveFeedbackService from "../services/saveFeedbackService.js";
import { showMessage } from "../../../databases/http_fluentd.js";

/**
 * This middleware saves the feedback to the database
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const FeedbackSavingMiddleware = async (req, res, next) => {
    const model = getModelService(req);

    /**
     * The structure of the data to be returned
     */
    const data = {
        content: model?.content,
        emailNotify: model?.emailNotify
    };

    /**
     * Check if the required fields are missing
     */
    if (!data?.content?.trim()) {
        return res.status(400).json(setFeedback(req.feedback, false));
    }

    try {
        await saveFeedbackService(data.content, data.emailNotify, req.userID);
    } catch (error) {
        showMessage("feedbackSavingMiddleware", error);
        return res.status(500).json(setFeedback(req.feedback, false));
    }

    next();
};

export default FeedbackSavingMiddleware;
