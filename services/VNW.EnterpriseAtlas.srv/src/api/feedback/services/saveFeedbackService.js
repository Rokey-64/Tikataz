import mysqlConn from "../../../databases/mysql-jack.js";
import feedbackModel from "../../../models/mysql/feedbackModel.js";
import { nanoid } from "nanoid";

/**
 * Save the feedback to the database
 * @param {*} content - The feedback content
 * @param {*} emailNotify - The email notification preference
 * @param {*} uid - The user ID
 * @returns 
 */
const saveFeedbackService = async (content, emailNotify, uid) => {
    const feedback = feedbackModel(mysqlConn);

    try {
        await feedback.create({
            id: nanoid(21),
            content: data.content,
            email_notify: data.emailNotify,
            state: "await",
            user_id: req.userID
        });
    } catch (error) {
        return error;
    }
}

export default saveFeedbackService;