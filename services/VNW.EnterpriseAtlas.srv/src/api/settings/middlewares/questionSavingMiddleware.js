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
 **/
const QuestionSavingMiddleware = async (req, res, next) => {
    const model = getModelService(req);

    if (!model?.answers?.length) {
        return res.status(400).json(setFeedback(req.feedback, false));
    }

    try {
        const result = await mysqlConn.query(`CALL spSaveSettings(:gUserID,:gArrayAnswer)`, {
            type: QueryTypes.RAW,
            replacements: {
                gUserID: req.userID,
                gArrayAnswer: JSON.stringify(model.answers)
            }
        });
        if (result.length === 0) {
            return res.status(400).json(setFeedback(req.feedback, false));
        }

        if(result[0].status === 0) {
            return res.status(400).json(setFeedback(req.feedback, false));
        }
        
        return res.status(200).json(setFeedback(req.feedback, true, result[0].message, {}));
    } catch (error) {
        // ⛔ TODO: Add the error to the logs
        return res.status(500).json(setFeedback(req.feedback, false));
    }
};

export default QuestionSavingMiddleware;