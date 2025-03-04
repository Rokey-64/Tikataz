import { QueryTypes } from "sequelize";
import mysqlConn from "../../../databases/mysql-jack.js";
import getModelService from "../../../services/getModelService.js";
import setFeedback from "../../../services/setFeedback.js";

/**
 * Loads a list of questions - answers for the settings form.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const QuestionsLoadingMiddleware = (typeName) => async (req, res, next) => {
    const model = getModelService(req);
    const userID = "dkebsheu1sed55a8wwd5+";
    const data = [
        /**
         * A structure of the data to be returned
         * The structure is as follows:
         * [{ id:questionID,
         *    question:question,
         *    defaultAnswer: answerID,
         *    labels:[{ id:answerID, value:answer }, { id:answerID, value:answer }]
         * }]
         */
    ];

    try {
        /**
         * Call the stored procedure to get the list of questions
         * 
         * @param {string} gUserID - The user ID
         * @param {string} gTypeName - The type name
         * 
         * @returns {Array}
         *  - question_id
         *  - question
         *  - answer_id
         *  - join_answer_id
         *  - join_answer
         */
        const result = await mysqlConn.query(`CALL spGetSettings(:gUserID,:gTypeName)`, {
            type: QueryTypes.RAW,
            replacements: {
                gUserID: userID,
                gTypeName: typeName
            }
        });
        if (result.length === 0) {
            return res.status(400).json(setFeedback(req.feedback, false, result[0].message, {}));
        }
        result.forEach(element => {
            const lables = [];

            // Split the answers and answer IDs
            const splitAnswer = element.join_answer.split(',');
            const splitAnswerID = element.join_answer_id.split(',');

            // Create the labels
            splitAnswer.forEach((answer, index) => {
                lables.push({
                    id: splitAnswerID[index],
                    value: answer
                });
            });

            // Push the data to the array
            data.push({
                id: element.question_id,
                question: element.question,
                defaultAnswer: element.answer_id,
                labels: lables
            });
        });

        model.questions = data;
    }
    catch (err) {
        return res.status(500).json(setFeedback(req.feedback, false, err.message, {}));
    }

    next();
};

export default QuestionsLoadingMiddleware;