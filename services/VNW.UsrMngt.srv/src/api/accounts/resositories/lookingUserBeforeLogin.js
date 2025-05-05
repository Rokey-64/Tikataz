
import mysqlConn from "#@/services/db-connection/mysql-jack.js";
import { QueryTypes } from 'sequelize';

/**
 * check if the password already exists in the database
 * @param {string} loginName - Login name or userID of the user.
 * @returns - The result of the query {isActive, isNeedsOTP, kindofOTP, destination, nationCode, userID, userPassword}
 */
const lookingUserBeforeLogin = async (loginName) => {
    try {
        const result = await mysqlConn.query("call SPUserInspector(:loginName)", {
            type: QueryTypes.RAW,
            replacements: { loginName: loginName },
        });

        if (result.length == 0) {
            throw new Error("User not found");
        }

        return result[0];
    }
    catch (error) {
        throw error;
    }

}

export default lookingUserBeforeLogin;