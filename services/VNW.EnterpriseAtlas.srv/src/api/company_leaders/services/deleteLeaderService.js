import { QueryTypes } from "sequelize";
import mysqlConn from "../../../databases/mysql-jack.js";

/**
 * Delete the leader of the company in the database
 * @param {*} uid - The user ID
 * @param {*} gid - The leader ID group
 * @returns 
 */
const deleteLeaderService = async (uid, gid) => {
    try {
        const result = await mysqlConn.query(`call spDeleteLeader(:gUserID, :gid)`,
            {
                type: QueryTypes.RAW,
                replacements: {
                    gUserID: uid,
                    gid: gid
                }
            });

        return result;
    }
    catch (err) {
        throw err;
    }
}

export default deleteLeaderService;