import mysqlConn from "../../../databases/mysql-jack.js";
import { QueryTypes } from "sequelize";

/**
 * Get uncomplete RFQ service
 * @param {*} uid - user id
 * @param {*} oid - order id
 * @param {*} type - type of RFQ
 * @returns 
 */
const getUncompleteRFQ = async (uid, oid, type) => {
    try {
        const result = await mysqlConn.query(`call spGetRecentlyAutoRFQ(:gUserID, :gRFQID, :gType)`,
            {
                type: QueryTypes.RAW,
                replacements: {
                    gUserID: uid,
                    gRFQID: oid,
                    gType: type,
                }
            });

        return result;
    }
    catch (err) {
        throw err;
    }
}

export default getUncompleteRFQ;