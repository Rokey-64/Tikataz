import reactionModel from "../../../../models/mongoo/userReactionModel";

/**
 * Add user reaction to a document
 * @param {*} cid - card id
 * @param {*} uid - user id
 * @param {*} type - reaction type (like, heart, dislike)
 * @param {*} reaction - reaction value
 */
const updateReactionService = async (cid, uid, cid_type, type) => {
    try {
        await reactionModel.updateOne(
            { cid, cid_type, uid },
            {
                $set: { type },
                $setOnInsert: { cid, cid_type, uid }
            },
            { upsert: true }
        );
    }
    catch (error) {
        throw error;
    }
}

export default updateReactionService;