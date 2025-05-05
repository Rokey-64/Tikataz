
import lookingUsername from "../resositories/lookingUsername.js";

/**
 * Check if the username already exists in the database
 * @param {*} loginName
 * @returns an object of the user if it exists {isActive, isNeedsOTP, kindofOTP, destination, nationCode, userID}
 */
const checkUsernameBeforeUpdate = async (loginName) => {
    return await lookingUsername(loginName).catch((err) => {
        throw err;
    });
}

export default checkUsernameBeforeUpdate;