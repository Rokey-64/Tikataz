import getModelService from "../../../services/getModelService.js";
import setFeedback from "../../../services/setFeedback.js";
import mysqlConn from "../../../databases/mysql-jack.js";
import { QueryTypes } from "sequelize";

/**
 * Save the profile to the database
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const ProfileSavingMiddleware = async (req, res, next) => {
    const model = getModelService(req);
    const userID = "dkebsheu1sed55a8wwd5+";
    // const data = {
    //     logo: "", nation: { value: "", id: "" }, name: "", taxCode: "",
    //     date: "", address: "", businessField: "", phone: "",
    //     fax: "", email: "", vision: "", mission: "", id: ""
    // };

    const data = {
        logo: model.logo, 
        nation:{value:model.nation.value, id:model.nation.id}, 
        name: model.name, 
        taxCode: model.taxCode,
        date: model.date.replace(/-/g, ""), 
        address: model.address, 
        businessField: model.businessField, 
        phone: model.phone,
        fax: model.fax, 
        email: model.email, 
        vision: model.vision, 
        mission: model.mission
    };
    /**
     * Check if the required fields are missing
     */
    if (data.name === ""
        || data.taxCode === ""
        || data.date === ""
        || data.address === ""
        || data.businessField === ""
        || data.phone === ""
        || data.email === ""
        || data.nation.value === ""
        || data.nation.id === "") {
        return res.status(400).json(setFeedback(req.feedback, false, "Missing required fields", {}));
    };

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
                    gCorpName: data.name,
                    gTaxCode: data.taxCode,
                    gRegisterDate: data.date,
                    gAddress: data.address,
                    gBussinessField: data.businessField,
                    gUserID: userID,
                    gVision: data.vision,
                    gMission: data.mission,
                    gFaxNumber: data.fax,
                    gNationID: data.nation.id,
                    gPhoneNumber: data.phone,
                    gEmail: data.email,
                    gLogoIndex: data.logo
                }
            }); //'Named replacement ":gBussinessField" has no entry in the replacement map.'

        if (result[0].status === 0) {
            return res.status(400).json(setFeedback(req.feedback, false, result[0].message, {}));
        }

    }
    catch (err) {
        return res.status(500).json(setFeedback(req.feedback, false, err.message, {}));
    }

    model.profile = data;
    next();
};

export default ProfileSavingMiddleware;