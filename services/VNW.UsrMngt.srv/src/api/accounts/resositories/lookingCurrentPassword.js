
import { verifyPassword} from '#@/services/password-hashing/index.js';
import mysqlConn from "#@/services/db-connection/mysql-jack.js";
import userAccountModel from '../models/TBUserAccount.js';

/**
 * Check if the password already exists in the database
 * @param {*} userID - The user id
 * returns - column of the table userAccount
 */
const lookingCurrentPassword = async (userID) => {

    /**
     * Create a new user account model
     * 
     * Fields:
     * * mysqlConn - The mysql connection
     */
    const userAccount = userAccountModel(mysqlConn)

    /**
     * Find the user by the user id
     * 
     * Fields:
     * * userID - The user id
     * 
     * Returns:
     * * The user account
     */
    const result = await userAccount.findOne({ where: { userID: user.userID } });

    /**
     * If the user is not found, throw an error
     * 
     * Fields:
     */
    if (result.length === 0) throw new Error('User not found');

    return result[0];
}

export default lookingCurrentPassword;