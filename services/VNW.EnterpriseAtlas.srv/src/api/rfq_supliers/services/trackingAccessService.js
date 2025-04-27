import mysqlConn from "../../../databases/mysql-jack.js";
import { QueryTypes } from "sequelize";

/**
 * Tracking Access Service
 * This service tracks the access of a user to a specific order.
 * @param {*} uid - User ID
 * @param {*} oid - Order ID
 * @returns 
 */
const trackingAccessService = async (uid, oid) => {
    try {
        const result = await mysqlConn.query(`call spCountRFQSupplierAccess(:gCardID, :gOrderID)`,
            {
                type: QueryTypes.RAW,
                replacements: {
                    gCardID: uid,
                    gOrderID: oid
                }
            });

        return result;
    }
    catch (err) {
        throw err;
    }
}

export default trackingAccessService;