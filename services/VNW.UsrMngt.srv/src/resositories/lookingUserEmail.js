
import { hashPassword} from '../services/password-hashing/index.js';
import mysqlConn from "../services/db-connection/mysql-jack.js";
import { nanoid } from 'nanoid';
import userAccountModel from '../models/TBUserAccount.js';
import userHistoryChangedPasswordModel from '../models/TBUserHistoryChangedPassword.js';
import { QueryTypes } from 'sequelize';

/**
 * Looking for the input email in the database
 * @param {*} loginName
 */
const lookingUserEmail = async (email) => {
    return await mysqlConn.query("call SPUserSignupInspector(:input_email)", {
        type: QueryTypes.RAW,
        replacements: { input_email: email},
    });
}

export default lookingUserEmail;