import userRateModel from "../../../../models/mongoo/userEvaluateModel.js";

/**
 * Add user reaction to a document
 * @param {*} cid - card id
 * @param {*} uid - user id
 * @param {*} type - reaction type (like, heart, dislike)
 * @param {*} reaction - reaction value
 */
const updateRatingService = async (cid, uid, cid_type, star) => {
    try {
        await userRateModel.updateOne(
            { cid, cid_type, uid },
            {
                $set: { star },
                $setOnInsert: { cid, cid_type, uid }
            },
            { upsert: true }
        );
    }
    catch (error) {
        throw error;
    }
}

export default updateRatingService;