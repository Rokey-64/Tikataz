import { QueryTypes } from "sequelize";
import mysqlConn from "../../../databases/mysql-jack.js";

/**
 * Save the leader of the company in the database
 * @param {*} gid - The leader ID group
 * @param {*} uid - The user ID
 * @param {*} name - The leader name
 * @param {*} position - The leader position
 * @param {*} date - The leader date
 * @param {*} phone - The leader phone
 * @param {*} email - The leader email
 * @param {*} slogan - The leader slogan
 * @param {*} logo - The leader logo
 * @param {*} state - The leader state
 * * @returns {Array} - ref: 
 */
const saveLeaderService = async ({gid, uid, name, position, date, phone, email, slogan, logo, state}) => {
    try {
        const result = await mysqlConn.query(`call spSaveLeaders(
                    :gid, 
                    :gUserID, 
                    :gName, 
                    :gPosition, 
                    :gDate, 
                    :gPhone, 
                    :gEmail,
                    :gSlogan,
                    :gLogoIndex,
                    :gState)`,
            {
                type: QueryTypes.RAW,
                replacements: {
                    gid: gid,
                    gUserID: uid,
                    gName: name,
                    gPosition: position,
                    gDate: date,
                    gPhone: phone,
                    gEmail: email,
                    gSlogan: slogan,
                    gLogoIndex: logo,
                    gState: state
                }
            });

        return result;
    }
    catch (err) {
        throw err;
    }
}

export default saveLeaderService;