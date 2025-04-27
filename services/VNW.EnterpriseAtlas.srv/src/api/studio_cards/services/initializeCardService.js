import mysqlConn from "../../../databases/mysql-jack.js";
import { QueryTypes } from "sequelize";

/**
 * Get initial card data for a user
 * @param {*} uid - The user ID
 * @returns 
 */
const initializeCardService = async (uid) => {
    try {
        const result = await mysqlConn.query(`call spGetInitialCardData(:gUserID)`,
            {
                type: QueryTypes.RAW,
                replacements: {
                    gUserID: uid
                }
            });

        return result;
    } catch (err) {
        throw err;
    }
}

export default initializeCardService;