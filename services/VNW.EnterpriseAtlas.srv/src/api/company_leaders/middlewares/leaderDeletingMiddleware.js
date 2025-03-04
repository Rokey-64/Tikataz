import { QueryTypes } from "sequelize";
import mysqlConn from "../../../databases/mysql-jack.js";
import getModelService from "../../../services/getModelService.js";
import setFeedback from "../../../services/setFeedback.js";

/**
 * This middleware is used to delete the branch of the company
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const LeaderDeletingMiddleware = async (req, res, next) => {
    const model = getModelService(req);
    const userID = "dkebsheu1sed55a8wwd5+";

    if (!model?.id?.trim()) {
        return res.status(400).json(setFeedback(req.feedback, false, "Missing required fields", {}));
    }

    try {
        /**
         * Call the stored procedure to delete the branch
         * 
         * @param {string} gUserID - The user ID
         * @param {string} gBranchID - The branch ID
         * 
         * @returns {Array} - ref: branchModel.js
         */
        const result = await mysqlConn.query(`call spDeleteLeader(:gid)`,
            {
                type: QueryTypes.RAW,
                replacements: {
                    gid: model.id
                }
            });

        if (result[0].status === 0) {
            return res.status(400).json(setFeedback(req.feedback, false, result[0].message, {}));
        }
    }
    catch (err) {
        return res.status(500).json(setFeedback(req.feedback, false, err.message, {}));
    }

    next();
};

export default LeaderDeletingMiddleware;