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
    const userID = "dkebsheu1sed55a8wwd5+";

    if (!model?.answers?.length) {
        return res.status(400).json(setFeedback(req.feedback, false, "Missing required fields", {}));
    }

    try {
        const result = await mysqlConn.query(`CALL spSaveSettings(:gUserID,:gArrayAnswer)`, {
            type: QueryTypes.RAW,
            replacements: {
                gUserID: userID,
                gArrayAnswer: JSON.stringify(model.answers)
            }
        });
        if (result.length === 0) {
            return res.status(400).json(setFeedback(req.feedback, false, result[0].message, {}));
        }

        if(result[0].status === 0) {
            return res.status(400).json(setFeedback(req.feedback, false, result[0].message, {}));
        }
        
        return res.status(200).json(setFeedback(req.feedback, true, result[0].message, {}));
    } catch (error) {
        return res.status(500).json(setFeedback(req.feedback, false, error.message, {}));
    }
};

export default QuestionSavingMiddleware;