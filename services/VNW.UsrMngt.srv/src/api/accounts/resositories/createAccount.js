
import mysqlConn from "#@/services/db-connection/mysql-jack.js";
import userAccountModel from '../models/TBUserAccount.js';
import userContactModel from '../models/TBUserContact.js';

const IN_DEFAULT_USE = 1;
const IN_DEFAULT_ROLE = 1;
/**
 * Update the password of the user account
 * @param {*} userID - The user id
 * @param {*} password - The new password
 */
const createAccount = async (userID, userName, hashPassword, email, googleId = '', loginType = 'local') => {
    const userAccount = userAccountModel(mysqlConn);
    const userContact = userContactModel(mysqlConn);

    /**
     * Save the user to the database
     */
    try {
        await mysqlConn.transaction(async (t) => {
            await userAccount.create({
                user_id: userID,
                state_id: IN_DEFAULT_USE,
                role_id: IN_DEFAULT_ROLE,
                user_name: userName,
                hash_password: hashPassword,
                googleId: googleId,
                loginType: loginType
            }, { transaction: t });

            await userContact.create({
                contact_id: userID,
                user_id: userID,
                nation_id: 1,
                contact_type: 'email',
                contact_value: email
            }, { transaction: t });
        });
    } catch (error) {
        throw error;
    }
}

export default createAccount;