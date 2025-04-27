import getModelService from "../../../services/getModelService.js";
import setFeedback from "../../../services/setFeedback.js";
import loadQuestionSettingService from "../services/loadQuestionSettingService.js";
import { showMessage } from "../../../databases/http_fluentd.js";

/**
 * Loads a list of questions - answers for the settings form.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const QuestionsLoadingMiddleware = (typeName) => async (req, res, next) => {
    const model = getModelService(req);
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
        const result = await loadQuestionSettingService(req.userID, typeName);
        if (result.length === 0) {
            return res.status(400).json(setFeedback(req.feedback, false));
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
        showMessage("QuestionsLoadingMiddleware", err);
        return res.status(500).json(setFeedback(req.feedback, false));
    }

    return next();
};

export default QuestionsLoadingMiddleware;