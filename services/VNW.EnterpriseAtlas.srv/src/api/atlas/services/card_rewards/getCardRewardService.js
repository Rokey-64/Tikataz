import { QueryTypes } from "sequelize";
import mysqlConn from "#@/databases/mysql-jack.js";

/**
 * Get user rewards
 * @param {string} uids
 */
const getCardRewardService = async (uids) => {
    try {
        /**
         * * Get user rewards
         * * @param {String} gUIDs - An array of the User ID
         */
        const result = await mysqlConn.query(`call spGetUserRewards(:gUIDs)`,
            {
                type: QueryTypes.RAW,
                replacements: {
                    gUIDs: uids
                }
            });

        return result;
    }

    catch (error) {
        throw error;
    }

}

export default getCardRewardService;