import mysqlConn from "../../../databases/mysql-jack.js";
import { QueryTypes } from "sequelize";

/**
 * Create RFQ Order Service
 * @param {*} uid - User ID
 * @param {*} payload - Payload containing order details
 * @returns 
 */
const createRFQOrderService = async (uid, payload) => {
    try {
        const result = await mysqlConn.query(`call spSaveNewRFQ(:gUserID, :gJson)`,
            {
                type: QueryTypes.RAW,
                replacements: {
                    gUserID: uid,
                    gJson: JSON.stringify(payload)
                }
            });

        return result;
    }
    catch (err) {
        throw err;
    }
}

export default createRFQOrderService;