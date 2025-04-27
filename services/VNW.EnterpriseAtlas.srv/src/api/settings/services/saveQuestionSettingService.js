import mysqlConn from "../../../databases/mysql-jack.js";
import { QueryTypes } from "sequelize";

/**
 * Save question settings for a user
 * @param {string} uid - The user ID
 * @param {Array} answers - The answers to save
 * @returns 
 */
const saveQuestionSettingService = async (uid, answers) => {
    try {
        const result = await mysqlConn.query(`CALL spSaveSettings(:gUserID,:gArrayAnswer)`, {
            type: QueryTypes.RAW,
            replacements: {
                gUserID: uid,
                gArrayAnswer: JSON.stringify(answers)
            }
        });
        return result;
    }
    catch (err) {
        throw err;
    }
}

export default saveQuestionSettingService;