
import { hashPassword} from '../services/password-hashing/index.js';
import mysqlConn from "../services/db-connection/mysql-jack.js";
import { nanoid } from 'nanoid';
import userAccountModel from '../models/TBUserAccount.js';
import userHistoryChangedPasswordModel from '../models/TBUserHistoryChangedPassword.js';
import { QueryTypes } from 'sequelize';

/**
 * Check if the password already exists in the database
 * @param {*} userID - The user id
 * @returns - The result of the query {[isDuplicatedPW]}
 */
const lookingNewPassword = async (userID) => {

    /**
     * Call the stored procedure to GET list of paswords that the user has used before
     * 
     * @param userID - The user id
     * 
     * 
     * @returns - The list of the query {[hash_password]}
     * * 
     */
    const result = await mysqlConn.query("call SPResetPasswordChecker(:userID)", {
        type: QueryTypes.RAW,
        replacements: { userID: userID }
    });

    return result;
}

export default lookingNewPassword;