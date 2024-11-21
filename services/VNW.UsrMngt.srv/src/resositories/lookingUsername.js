
import { hashPassword} from '../services/password-hashing/index.js';
import mysqlConn from "../services/db-connection/mysql-jack.js";
import { nanoid } from 'nanoid';
import userAccountModel from '../models/TBUserAccount.js';
import userHistoryChangedPasswordModel from '../models/TBUserHistoryChangedPassword.js';
import { QueryTypes } from 'sequelize';
import TkzRegException from '../exception/registerException.js';

/**
 * check if the password already exists in the database
 * @param {*} userID - The user id
 * @param {*} password - The new password
 */
const lookingUsername = async (loginName) => {
    const result = await mysqlConn.query("call SPUserInspector(:loginName)", {
        type: QueryTypes.RAW,
        replacements: { loginName: loginName},
    }).catch((err) => {
        throw err;
    });

    if (result.length == 0) {
        throw new TkzRegException('User not found');
    }

    return result[0];
}

export default lookingUsername;