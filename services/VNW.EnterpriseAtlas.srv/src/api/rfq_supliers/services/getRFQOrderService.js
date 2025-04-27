import mysqlConn from "../../../databases/mysql-jack.js";
import { QueryTypes } from "sequelize";

/**
 * Get RFQ Order Service
 * This service retrieves the RFQ order details for a specific user.
 * @param {*} uid - User ID
 * @param {*} oid - Order ID
 * @returns 
 */
const getRFQOrderService = async (uid, oid) => {
    try {
        const result = await mysqlConn.query(`call spGetRFQSuppliers(:gCardID, :gOrderID)`,
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

export default getRFQOrderService;