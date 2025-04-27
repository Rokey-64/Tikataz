import { QueryTypes } from "sequelize";
import mysqlConn from "../../../databases/mysql-jack.js";

/**
 * Save the leader of the company in the database
 * 
 * @param {*} name - The company / Business name
 * @param {*} taxcode - The company / Business tax code
 * @param {*} date - The company / Business register date
 * @param {*} address - The company / Business address
 * @param {*} businessField - The company / Business field of business
 * @param {*} uid - The user ID
 * @param {*} vision - The company / Business vision
 * @param {*} mission - The company / Business mission
 * @param {*} fax - The company / Business fax number
 * @param {*} nation - The company / Business nation ID
 * @param {*} phone - The company / Business phone number
 * @param {*} email - The company / Business email
 * @param {*} logoIndex - The company / Business logo index
 * @returns 
 */
const saveLeaderService = async ({
        name, 
        taxcode, 
        date,
        address,
        businessField,
        uid,
        vision,
        mission,
        fax,
        nation,
        phone,
        email,
        logoIndex
    }) => {
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
                    gCorpName: name,
                    gTaxCode: taxcode,
                    gRegisterDate: date,
                    gAddress: address,
                    gBussinessField: businessField,
                    gUserID: uid,
                    gVision: vision,
                    gMission: mission,
                    gFaxNumber: fax,
                    gNationID: nation,
                    gPhoneNumber: phone,
                    gEmail: email,
                    gLogoIndex: logoIndex
                }
            });

        return result;
    }
    catch (err) {
        throw err;
    }
}

export default saveLeaderService;