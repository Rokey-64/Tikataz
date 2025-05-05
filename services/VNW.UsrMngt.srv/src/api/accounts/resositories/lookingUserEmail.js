
import mysqlConn from "#@/services/db-connection/mysql-jack.js";
import { QueryTypes } from 'sequelize';

/**
 * Looking for the input email in the database
 * @param {*} loginName
 * @returns isUse bool, isSpam bool
 */
const lookingUserEmail = async (email) => {
    return await mysqlConn.query("call SPUserSignupInspector(:input_email)", {
        type: QueryTypes.RAW,
        replacements: { input_email: email},
    });
}

export default lookingUserEmail;