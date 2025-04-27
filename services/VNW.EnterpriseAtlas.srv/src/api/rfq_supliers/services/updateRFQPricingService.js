import mysqlConn from "../../../databases/mysql-jack.js";
import { QueryTypes } from "sequelize";

/**
 * Update RFQ Pricing Service
 * This service updates the pricing details for a specific RFQ order.
 * @param {*} uid - User ID
 * @param {*} oid - Order ID
 * @param {*} active - Active status (0 or 1)
 * @returns 
 */
const updateRFQPricingService = async (uid, oid, payload) => {
    try {
        const result = await mysqlConn.query(`call spSaveRFQSuppliers(:gCardID, :gOrderID, :gJson)`,
            {
                type: QueryTypes.RAW,
                replacements: {
                    gCardID: cid,
                    gOrderID: oid,
                    gJson: JSON.stringify(payload)
                }
            });

        return result;
    }
    catch (err) {
        throw err;
    }
}

export default updateRFQPricingService;