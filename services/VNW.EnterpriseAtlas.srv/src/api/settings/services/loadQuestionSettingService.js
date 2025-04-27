import mysqlConn from "../../../databases/mysql-jack.js";
import { QueryTypes } from "sequelize";

/**
 * * Load question settings for a user
 * * @param {string} uid - The user ID
 * * @param {string} typeName - The type name for the settings
 * @returns 
 */
const loadQuestionSettingService = async (uid, typeName) => {
    try {
        const result = await mysqlConn.query(`CALL spGetSettings(:gUserID,:gTypeName)`, {
            type: QueryTypes.RAW,
            replacements: {
                gUserID: uid,
                gTypeName: typeName
            }
        });
        return result;
    }
    catch (err) {
        throw err;
    }
}

export default loadQuestionSettingService;