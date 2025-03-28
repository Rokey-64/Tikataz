import getModelService from "../../../services/getModelService.js";
import setFeedback from "../../../services/setFeedback.js";
import mysqlConn from "../../../databases/mysql-jack.js";
import { QueryTypes } from "sequelize";
import { stringify } from "qs";

/**
 * Save the profile to the database
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const ProfileSavingMiddleware = async (req, res, next) => {
    const model = getModelService(req);
    const profile = model.profile;

    try {
        const result = await mysqlConn.query(`call spSaveCommonProfile(
                                :gCorpName, :gTaxCode, :gRegisterDate, 
                                :gAddress, :gBussinessField, :gUserID, 
                                :gVision, :gMission, :gFaxNumber, 
                                :gNationID, :gPhoneNumber, :gEmail, 
                                :gLogoIndex)`,
            {
                type: QueryTypes.RAW,
                replacements: {
                    gCorpName: profile.name,
                    gTaxCode: profile.taxCode,
                    gRegisterDate: profile.date.replace(/-/g, ''),
                    gAddress: profile.address,
                    gBussinessField: profile.businessField,
                    gUserID: req.userID,
                    gVision: profile.vision,
                    gMission: profile.mission,
                    gFaxNumber: profile.fax,
                    gNationID: profile.nation.id,
                    gPhoneNumber: profile.phone,
                    gEmail: profile.email,
                    gLogoIndex: `${req.userID}_company_logo`
                }
            }); //'Named replacement ":gBussinessField" has no entry in the replacement map.'

        if (result[0].status === 0) {
            return res.status(400).json(setFeedback(req.feedback, false));
        }

    }
    catch (err) {
        // ⛔ TODO: Log the error here
        return res.status(500).json(setFeedback(req.feedback, false));
    }

    next();
};

export default ProfileSavingMiddleware;