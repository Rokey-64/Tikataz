
import { hashPassword} from '#@/services/password-hashing/index.js';
import mysqlConn from "#@/services/db-connection/mysql-jack.js";
import { nanoid } from 'nanoid';
import userAccountModel from '../models/TBUserAccount.js';
import userHistoryChangedPasswordModel from '../models/TBUserHistoryChangedPassword.js';

/**
 * Update the password of the user account
 * @param {*} userID - The user id
 * @param {*} password - The new password
 */
const updatePassword = async (userID, password) => {
    const userAccount = userAccountModel(mysqlConn);
    const userHistoryChangedPassword = userHistoryChangedPasswordModel(mysqlConn);

    // query hash_password from user_account
    const result = await userAccount.findOne({
        attibutes: ['hash_password'],
        where: { user_id: userID }
    }).catch((err) => {
        throw new Error(err.message);
    });

    if (!result) {
        throw new Error('Password not found');
    }

    // get the current password
    const currHashPassword = result.hash_password;

    // hash the new password
    const newHashPassword = await hashPassword(password);

    /**
     * **********  Reset the password  ********** 
     * 1. Update the password in the user account
     * 2. Save the password to the history of the changed password
     */
    mysqlConn.transaction(async (t) => {
        await userAccount.update({
            hash_password: newHashPassword
        }, {
            where: { user_id: userID },
            transaction: t
        });


        await userHistoryChangedPassword.create({
            hpw_id: nanoid(),
            user_id: userID,
            hash_password: currHashPassword
        }, {
            transaction: t
        });

    }).catch((err) => {
        throw new Error(err.message);
    });
}

export default updatePassword;