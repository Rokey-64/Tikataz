import { QueryTypes } from "sequelize";
import mysqlConn from "../../../databases/mysql-jack.js";
import getModelService from "../../../services/getModelService.js";
import setFeedback from "../../../services/setFeedback.js";

const BasicLoadingMiddleware = async (req, res, next) => {
    const model = getModelService(req);
    
    try{
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
        const result = await mysqlConn.query(`CALL spGetSettingsBasic(:gUserID)`, {
            type: QueryTypes.RAW,
            replacements: {
                gUserID: req.userID
            }
        });
        if(result[0].length === 0){
            return res.status(400).json(setFeedback(req.feedback, false));
        }

        model.basicData = result[0];
       
    } catch (error) {
        return res.status(500).json(setFeedback(req.feedback, false));
    }

    next();
};

export default BasicLoadingMiddleware;