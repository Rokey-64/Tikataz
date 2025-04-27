import mysqlConn from "../../../databases/mysql-jack.js";
import { QueryTypes } from "sequelize";

/**
 * Rejected Quote Service
 * @param {*} uid - User ID
 * @param {*} oid - Order ID
 * @param {*} active - Active status (0 or 1)
 * @returns 
 */
const rejectedQuoteService = async (uid, oid, active) => {
    try {
        const result = await mysqlConn.query(`call spSaveAutoRFQCancellation(:gUserID, :gOrderID, :gActive)`,
            {
                type: QueryTypes.RAW,
                replacements: {
                    gUserID: uid,
                    gOrderID: oid,
                    gActive: Number(active)
                }
            });


        return result;
    }
    catch (err) {
        throw err;
    }
}

export default rejectedQuoteService;