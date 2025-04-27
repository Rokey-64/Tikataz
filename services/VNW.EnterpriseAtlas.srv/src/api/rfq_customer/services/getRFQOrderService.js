import mysqlConn from "../../../databases/mysql-jack.js";
import { QueryTypes } from "sequelize";

/**
 * Get RFQ Order Service by User ID and Order ID
 * @param {*} uid - User ID
 * @param {*} oid - Order ID
 * @returns 
 */
const getRFQOrderService = async (uid, oid) => {
    try {
        const result = await mysqlConn.query(`call spGetRFQOrder(:gUserID, :gOrderID)`,
            {
                type: QueryTypes.RAW,
                replacements: {
                    gUserID: uid,
                    gOrderID: oid
                }
            });

        return result;
    }
    catch (err) {
        throw err;
    }
}

export default getRFQOrderService;