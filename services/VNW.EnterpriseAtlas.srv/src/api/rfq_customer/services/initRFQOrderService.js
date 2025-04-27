import mysqlConn from "../../../databases/mysql-jack.js";
import { QueryTypes } from "sequelize";

/**
 * Initialize RFQ order service
 * @param {*} uid - user id
 * @returns 
 */
const initRFQOrderService = async (uid) => {
    try {
        const result = await mysqlConn.query(`call spGetRFQInit(:gUserID)`,
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

export default initRFQOrderService;