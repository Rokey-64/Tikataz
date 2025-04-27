import mysqlConn from "../../../databases/mysql-jack.js";
import { QueryTypes } from "sequelize";

/**
 * Save Branch Service
 * @param {*} gid - Branch ID
 * @param {*} uid - User ID
 * @param {*} name - Branch Name
 * @param {*} taxcode - Tax Code
 * @param {*} date - Register Date
 * @param {*} phone - Phone
 * @param {*} email - Email
 * @param {*} address - Address
 * @returns 
 */
const saveBranchService = async ({gid, uid, name, taxcode, date, phone, email, address}) => {
    try {
        const result = await mysqlConn.query(`call spSaveBranches(
                    :gid, 
                    :gUserID, 
                    :gName, 
                    :gCode, 
                    :gDate, 
                    :gPhone, 
                    :gEmail,
                    :gAddress)`,
            {
                type: QueryTypes.RAW,
                replacements: {
                    gid: gid,
                    gUserID: uid,
                    gName: name,
                    gCode: taxcode,
                    gDate: date,
                    gPhone: phone,
                    gEmail: email,
                    gAddress: address
                }
            });

        return result;
    }
    catch (err) {
        throw err;
    }
}

export default saveBranchService;