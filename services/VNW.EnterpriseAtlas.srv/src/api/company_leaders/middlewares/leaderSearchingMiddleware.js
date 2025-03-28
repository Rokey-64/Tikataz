import { Op, QueryTypes } from "sequelize";
import setFeedback from "../../../services/setFeedback.js";
import mysqlConn from "../../../databases/mysql-jack.js";
import getModelService from "../../../services/getModelService.js";
import createShortLinkRedis from "../../../services/createShortLinkRedis.js";
import initContainerCliAzure from "../../../services/initializeContainerClientAzure.js";

/**
 * This middleware is used to search the branch of the company
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const LeaderSeachingMiddleware = async (req, res, next) => {
    const model = getModelService(req);
    const containerClient = initContainerCliAzure("images");
    
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
                    gUserID: req.userID
                }
            });

        if (result[0].length === 0) {
            return res.status(404).json(setFeedback(model, false));
        }

        /**
         * Create the branch template that suits the response
         */
        for(const item of result){
            const blobKey = `${item.id}_avatar`;
            const shortLink = await createShortLinkRedis(blobKey, containerClient);

            leaders.push({
                id: item.id,
                name: item.name,
                position: item.position,
                date: item.date,
                phone: item.phone_number,
                email: item.email,
                slogan: item.slogan,
                logo: shortLink,
            });
        }
    }
    catch (err) {
        return res.status(500).json(setFeedback(model, false));
    }

    model.leaders = leaders;
    next();
};

export default LeaderSeachingMiddleware;