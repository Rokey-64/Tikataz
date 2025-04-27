import mysqlConn from "../../../databases/mysql-jack.js";
import { QueryTypes } from "sequelize";

/**
 * Look for the branch of the company in the database
 * @param {*} uid - The user ID
 * @returns 
 */
const searchBranchService = async (uid) => {
    try {
        const result = await mysqlConn.query(`call spGetBranches(:gUserID)`,
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
export default searchBranchService;