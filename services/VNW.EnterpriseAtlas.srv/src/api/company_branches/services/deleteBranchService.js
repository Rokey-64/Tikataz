import { QueryTypes } from "sequelize";
import mysqlConn from "../../../databases/mysql-jack.js";

/**
 * Delete Branch Service
 * @param {String} uid - User ID
 * @param {String} bid - Branch ID 
 * @returns 
 */
const deleteBranchService = async (uid, bid) => {
    try {
        const result = await mysqlConn.query(`call spDeleleBranches(:gUserID, :gid)`,
            {
                type: QueryTypes.RAW,
                replacements: {
                    gUserID: uid,
                    gid: bid
                }
            });

        return result;
    }
    catch (error) {
        throw error;
    }
}

export default deleteBranchService;