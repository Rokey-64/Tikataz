import getModelService from "../../../services/getModelService.js";
import setFeedback from "../../../services/setFeedback.js";
import mysqlConn from "../../../databases/mysql-jack.js";
import { QueryTypes } from "sequelize";
import feedbackModel from "../../../models/feedbackModel.js";
import { nanoid } from "nanoid";
import { use } from "i18next";

/**
 * This middleware saves the feedback to the database
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const FeedbackSavingMiddleware = async (req, res, next) => {
    const model = getModelService(req);
    const userID = "dkebsheu1sed55a8wwd5+";
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
        return res.status(400).json(setFeedback(req.feedback, false, "Missing required fields", {}));
    }

    try {
        await feedback.create({
            id: nanoid(21),
            content: data.content,
            email_notify: data.emailNotify,
            state: "await",
            user_id: userID
        });
    } catch (error) {
        return res.status(500).json(setFeedback(req.feedback, false, error.message, {}));
    }

    next();
};

export default FeedbackSavingMiddleware;
