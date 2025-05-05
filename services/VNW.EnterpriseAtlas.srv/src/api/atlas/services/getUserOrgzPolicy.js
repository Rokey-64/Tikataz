import CommonCardTemplate from "./card_base/templateService.js";
import cardModel from "#@/models/mongoo/cardModel.js";
import mongoose from "mongoose";

/**
 * @description Get the user organization profile
 * @param {string} uid - The user ID
 * @param {string} cid - The card ID
 * @param {string} ctype - The card type
 */
const getUserOrgzPolicy = async (cid, ctype) => {

    const cardObj = new cardModel();
    let payload = cardObj.category;

    if (!cid || !ctype) return payload;


    if (CommonCardTemplate.ctype.manual === ctype) {
        /***
         * * Get from raw_cards mongoDB
         */

        try {
            const result = await cardModel.findOne({ _id: new mongoose.Types.ObjectId(cid) }, {
                "category": 1,
                "_id": 0,
            },).lean();

            payload = result.category;
        }
        catch (error) {
            throw error;
        }
    } 

    return payload;
}

export default getUserOrgzPolicy;