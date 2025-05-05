import CommonCardTemplate from "./card_base/templateService.js";
import tagModel from "#@/models/mongoo/tagModel.js";
import mongoose from "mongoose";
import mysqlConn from "#@/databases/mysql-jack.js";
import { QueryTypes } from "sequelize";

/**
 * @description Get the user organization profile
 * @param {string} uid - The user ID
 * @param {string} cid - The card ID
 * @param {string} ctype - The card type
 */
const getUserOrgzProfile = async (uid, cid, ctype) => {
   
    const payload = {
        cid: cid,
        corpName: "",
        taxcode: "",
        regDate: "",
        bizFields: "",
        description: "",
        officeAddr: "",
        phoneNumber: "",
        email: "",
        website: "",
        vision: "",
        mission: "",
        nation: "Việt Nam"
    }

    if (!cid || !ctype) return payload;


    if (CommonCardTemplate.ctype.auto === ctype) {
        /***
         * * Get from raw_cards mongoDB
         */

        try {
            const card = await tagModel.findOne({ _id: new mongoose.Types.ObjectId(cid) }, {
                "company.companyname": 1,
                "company.taxcode": 1,
                "contact.email": 1,
                "contact.address": 1,
                "contact.phone": 1,
                "header.domain": 1,
            }).lean();
    
            if (!card) return null;
    
            payload.corpName = card.company.companyname || "";
            payload.taxcode = card.company.taxcode?.[0] || "";
            payload.regDate = "";
            payload.bizFields = "";
            payload.description = "";
            payload.officeAddr = card.contact.address?.[0] || "";
            payload.phoneNumber = card.contact.phone?.[0] || "";
            payload.email = card.contact.email?.[0] || "";
            payload.website = card.header.domain || "";
        }
        catch (error) {
            throw error;
        }
    }
    else if (CommonCardTemplate.ctype.manual === ctype) {
        /***
         * If the card is manual, and they have a link with the user profile, we can get the data from the user profile
         */

        if (!uid) return payload;

        try {
            const result = await mysqlConn.query("call spGetCommonProfile(:gUserID)", {
                type: QueryTypes.RAW,
                replacements: { gUserID: uid }
            });

            if(result.length > 0){
                const profile = result[0];
                payload.nation = profile.nation_name;
                payload.corpName = profile.corp_name;
                payload.taxCode = profile.tax_code;
                payload.regDate = profile.register_date;
                payload.officeAddr = profile.address;
                payload.bizFields = profile.bussiness_field;
                payload.phoneNumber = profile.phone_number;
                payload.email = profile.email;
                payload.vision = profile.vision;
                payload.mission = profile.mission
            }
        } catch (error) {
            throw error;
        }
    }

    return payload;
}

export default getUserOrgzProfile;