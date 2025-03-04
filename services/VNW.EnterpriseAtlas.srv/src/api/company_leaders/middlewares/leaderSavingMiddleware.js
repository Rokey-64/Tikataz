import getModelService from "../../../services/getModelService.js";
import setFeedback from "../../../services/setFeedback.js";
import mysqlConn from "../../../databases/mysql-jack.js";
import { QueryTypes } from "sequelize";

/**
 * This middleware is used to save the branch of the company
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const LeaderSavingMiddleware = async (req, res, next) => {
    const model = getModelService(req);
    const userID = "dkebsheu1sed55a8wwd5+";

    if (!model?.name?.trim() || !model?.position?.trim()) {
        return res.status(400).json(setFeedback(req.feedback, false, "Missing required fields", {}));
    }

    try {
        /**
         * Call the stored procedure to save the branch
         * 
         * @param {string} gUserID - The user ID
         * @param {string} gBranchName - The branch name
         * @param {string} gTaxCode - The tax code
         * @param {string} gRegisterDate - The register date
         * @param {string} gAddress - The address
         * @param {string} gPhone - The phone
         * @param {string} gEmail - The email
         * 
         * @returns {Array} - ref: branchModel.js
         */
        const result = await mysqlConn.query(`call spSaveLeaders(
                    :gid, 
                    :gUserID, 
                    :gName, 
                    :gPosition, 
                    :gDate, 
                    :gPhone, 
                    :gEmail,
                    :gSlogan,
                    :gLogoIndex)`,
            {
                type: QueryTypes.RAW,
                replacements: {
                    gid: model.id,
                    gUserID: userID,
                    gName: model.name,
                    gPosition: model.position,
                    gDate: model.date?.replace(/-/g, "") || "",
                    gPhone: model.phone,
                    gEmail: model.email,
                    gSlogan: model.slogan,
                    gLogoIndex: model.logo
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

export default LeaderSavingMiddleware;