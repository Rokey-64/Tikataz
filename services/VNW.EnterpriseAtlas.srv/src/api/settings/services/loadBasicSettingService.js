import mysqlConn from "../../../databases/mysql-jack.js";
import { QueryTypes } from "sequelize";

/**
 * * Load basic settings for a user
 * * @param {string} uid - The user ID
 * @returns 
 */
const loadBasicSettingService = async (uid) => {
    try {
        const result = await mysqlConn.query(`CALL spGetSettingsBasic(:gUserID)`, {
            type: QueryTypes.RAW,
            replacements: {
                gUserID: uid
            }
        });
        return result;
    }
    catch (err) {
        throw err;
    }
}

export default loadBasicSettingService;