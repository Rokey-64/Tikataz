import getModelService from "../../../services/getModelService.js";
import setFeedback from "../../../services/setFeedback.js";
import mysqlConn from "../../../databases/mysql-jack.js";
import feedbackModel from "../../../models/feedbackModel.js";
import { nanoid } from "nanoid";

/**
 * This middleware saves the feedback to the database
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const FeedbackSavingMiddleware = async (req, res, next) => {
    const model = getModelService(req);
    const feedback = feedbackModel(mysqlConn);

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
        await feedback.create({
            id: nanoid(21),
            content: data.content,
            email_notify: data.emailNotify,
            state: "await",
            user_id: req.userID
        });
    } catch (error) {
        // ⛔ TODO: Log the error here
        return res.status(500).json(setFeedback(req.feedback, false));
    }

    next();
};

export default FeedbackSavingMiddleware;
