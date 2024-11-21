
import lookingNewPassword from "../resositories/lookingNewPassword.js";
import { verifyPassword } from "../services/password-hashing/index.js";

/**
 * Check if the password already exists in the database
 * @param {*} userID - The user id
 * @param {*} password - The new password
 */
const checkPasswordBeforeUpdate = async (userID, password) => {
    /**
     * Return the result of the query.
     * Result is a array of hash_password.
     */
    let result = await lookingNewPassword(userID, password).catch((err) => {
        throw new Error(err.message);
    });

    /**
     * If the result is empty, return false. Check database for more information.
     */
    if(!result?.length) return true;

    /**
     * Whether the password is the same as the previous
     * * true - The password is the same as the previous.
     * * false - The password is not the same as the previous.
     * 
     * Loop through the result and check if the password is the same as the previous
     * If the password is the same as the previous, return false.
     * If the password is not the same as the previous, return true.
    */
    for (let i = 0; i < result.length; i++) {

        // Check if the password is the same as the previous
        const isMatch = await verifyPassword(password, result[i].hash_password).catch((err) => {
            throw new Error(err.message);
        });

        // If the password is the same as the previous, return false.
        if (isMatch) {
            return false;
        }
    }

    return true;
};

export default checkPasswordBeforeUpdate;