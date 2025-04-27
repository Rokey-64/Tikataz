import mysqlConn from "../../../databases/mysql-jack.js";
import { QueryTypes } from "sequelize";

/**
 * Get Currency Service
 * This service retrieves the currency information from the database.
 * @param {*} uid - User ID
 * @param {*} oid - Order ID
 * @param {*} active - Active status (0 or 1)
 * @returns 
 */
const getCurrencyService = async () => {
    try {
        const result = await mysqlConn.query(`call spGetCurrency()`,
            {
                type: QueryTypes.RAW,
                replacements: {}
            });

        return result;
    }
    catch (err) {
        throw err;
    }
}

export default getCurrencyService;