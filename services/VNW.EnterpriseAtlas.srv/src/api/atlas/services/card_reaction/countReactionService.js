import { GEN_CARD_REACTION_KEY } from "#@/services/generateRedisKeys.js";
import { cluster } from '#@/databases/redis-jack.js';
import userReactionModel from '#@/models/mongoo/userReactionModel.js';


/**
 * Count the rating of a card
 * @param {*} cids - array of card ids
 */
const countReactionService = async (cids) => {
    const TTL_IN_SECONDS = 60 * 5; // 5 phút
    // Create a Redis key for each card id
    const keys = cids.map(cid => GEN_CARD_REACTION_KEY(cid));

    // Create a payload object to store the counts
    const payload = Object.fromEntries(cids.map(cid => [cid, {}]));

    // Contains the non-existent keys in Redis
    const nonEXRedisCIDs = [];

    try {
        await getReactionFromRedis(cids, payload, keys, nonEXRedisCIDs);
    }
    catch (error) {
        throw error;
    }


    // If there are non-existent keys, fetch the counts from the database
    if (nonEXRedisCIDs.length > 0) {
        try {
            await getReactionFromMongo(payload, nonEXRedisCIDs);
        }
        catch (error) {
            throw error;
        }
    }

    // update new count to redis
    try {
        const tasks = [];
        for (const cid of nonEXRedisCIDs) {
            const jsonString = JSON.stringify(payload[cid] || {});
            tasks.push(cluster.set(GEN_CARD_REACTION_KEY(cid), jsonString, "EX", TTL_IN_SECONDS, "NX"));
        }
        await Promise.all(tasks);
    }
    catch (error) {
        throw error;
    }

    return payload;
};

export default countReactionService;

const getReactionFromRedis = async (cids, payload, keys, nonEXRedisCIDs) => {
    // Try to get the count of ratings from Redis
    try {
        const redisResult = await Promise.all(
            keys.map((key) => {
                return cluster.get(key);
            })
        );

        // Update the result object with the counts from Redis
        redisResult.forEach((rate, index) => {
            if (rate !== null) {
                // If the count is not null, parse it and update the result object
                payload[cids[index]] = JSON.parse(rate);
            }
            else {
                // If the count is null, add the key to the nonEXRedisCIDs array
                nonEXRedisCIDs.push(cids[index]);
            }
        });
    }
    catch (error) {
        throw error;
    }
}

const getReactionFromMongo = async (payload, nonEXRedisCIDs) => {
    try {
        const userRate = await userReactionModel.aggregate([
            {
                $match: {
                    cid: { $in: nonEXRedisCIDs },
                    // type: { $nin: ["dislike"] },
                },
            },
            {
                $group: {
                    _id: {
                        cid: "$cid",
                        type: "$type",
                    },
                    count: { $sum: 1 },
                },
            },
        ]);

        userRate.forEach((item) => {
            const cid = item._id.cid;
            const type = item._id.type;
            const count = item.count;

            if (!payload[cid]) {
                payload[cid] = {};
            }

            payload[cid][type] = count;
        });
    }
    catch (error) {
        throw error;
    }
}