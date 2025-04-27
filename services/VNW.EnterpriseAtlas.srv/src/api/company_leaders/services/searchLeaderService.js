import { QueryTypes } from "sequelize";
import mysqlConn from "../../../databases/mysql-jack.js";

/**
 * Search the leader of the company in the database
 * @param {*} uid - The user ID
 * @returns 
 */
const searchLeaderService = async (uid) => {
    try {
        const result = await mysqlConn.query(`call spGetLeaders(:gUserID)`,
            {
                type: QueryTypes.RAW,
                replacements: {
                    gUserID: uid
                }
            });

        return result;
    }
    catch (err) {
        throw err;
    }
}

export default searchLeaderService;