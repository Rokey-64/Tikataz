import { Op, QueryTypes } from "sequelize";
import setFeedback from "../../../services/setFeedback.js";
import mysqlConn from "../../../databases/mysql-jack.js";
import getModelService from "../../../services/getModelService.js";
import createBranchModel from "../../../models/branchModel.js";
import createMailListModel from "../../../models/mailListModel.js";
import createPhoneListModel from "../../../models/phoneListModel.js";

/**
 * This middleware is used to search the branch of the company
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const LeaderSeachingMiddleware = async (req, res, next) => {
    const model = getModelService(req);
    const userID = "dkebsheu1sed55a8wwd5+";
    const leaders = [];

    try {
        /**
         * Call the stored procedure to search the branch
         * 
         * @param {string} gUserID - The user ID
         * 
         * @returns {Array} - ref: branchModel.js
         */
        const result = await mysqlConn.query(`call spGetLeaders(:gUserID)`,
            {
                type: QueryTypes.RAW,
                replacements: {
                    gUserID: userID
                }
            });

        if (result[0].length === 0) {
            setFeedback(model, 404, "No data found", {});
            return res.status(model.status).json(model);
        }

        /**
         * Create the branch template that suits the response
         */
        result.forEach((item) => {
            leaders.push({
                id: item.id,
                name: item.name,
                position: item.position,
                date: item.date,
                phone: item.phone_number,
                email: item.email,
                slogan: item.slogan,
                logo: item.logo_index,
            });
        });

    }
    catch (err) {
        return res.status(model.status).json(setFeedback(model, 500, "Internal server error", err));
    }

    model.leaders = leaders;
    next();
};

export default LeaderSeachingMiddleware;