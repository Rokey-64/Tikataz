import mysqlConn from "../../../databases/mysql-jack.js";
import { QueryTypes } from "sequelize";

/**
 * Get item history service
 * @param {*} uid - user id
 * @param {*} search - search string
 * @returns 
 */
const getItemHistoryService = async (uid, search) => {
    try{
        const result = await mysqlConn.query(`call spGetRFQItemHistory(:gUserID, :gSearch)`,
            {
                type: QueryTypes.RAW,
                replacements: {
                    gUserID: uid,
                    gSearch: search
                }
            });

        return result;
    }
    catch (err) {
        throw err;
    }
}

export default getItemHistoryService;