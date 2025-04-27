import mysqlConn from "../../../databases/mysql-jack.js";
import { QueryTypes } from "sequelize";

/**
 * Search hashtag service
 * @param {*} search - search string
 * @returns 
 */
const findHashtagService = async (search) => {
    try {
        const result = await mysqlConn.query(`call spGetHashtagSuggestion(:gSearch)`,
            {
                type: QueryTypes.RAW,
                replacements: {
                    gSearch: search
                }
            });

        return result;
    }
    catch (err) {
        throw err;
    }
}

export default findHashtagService;