import getModelService from "../../../services/getModelService.js";
import setFeedback from "../../../services/setFeedback.js";
import mysqlConn from "../../../databases/mysql-jack.js";
import { QueryTypes } from "sequelize";
import { showMessage } from "../../../databases/http_fluentd.js";

/**
 * This middleware is used to save the branch of the company
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const leaderSavingMiddleware = async (req, res, next) => {
    const model = getModelService(req);
    const data = model.data;

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
                    :gLogoIndex,
                    :gState)`,
            {
                type: QueryTypes.RAW,
                replacements: {
                    gid: data.id,
                    gUserID: req.userID,
                    gName: data.name,
                    gPosition: data.position,
                    gDate: data.date?.replace(/-/g, "") || "",
                    gPhone: data.phone,
                    gEmail: data.email,
                    gSlogan: data.slogan,
                    gLogoIndex: `${data.id}_avatar`,
                    gState: model.state
                }
            });

        if (result[0].status === 0) {
            showMessage(result[0].message);
            return res.status(400).json(setFeedback(req.feedback, false));
        }
    }
    catch (err) {
        showMessage(err);
        return res.status(500).json(setFeedback(req.feedback, false));
    }

    next();
};

export default leaderSavingMiddleware;