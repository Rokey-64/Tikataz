import { GEN_CARD_RATING_KEY } from "#@/services/generateRedisKeys.js";
import { cluster } from '#@/databases/redis-jack.js';
import userRateModel from "#@/models/mongoo/userEvaluateModel.js";

/**
 * Count the rating of a card
 * @param {*} cids - array of card ids
 */
const countRatingService = async (cids) => {
    const TTL_IN_SECONDS = 60 * 5; // 5 phút
    // Create a Redis key for each card id
    const keys = cids.map(cid => GEN_CARD_RATING_KEY(cid));

    // Create a payload object to store the counts
    const payload = Object.fromEntries(cids.map(cid => [cid, 0]));

    // Contains the non-existent keys in Redis
    const nonEXRedisCIDs = [];

    try {
        await getRatingFromRedis(cids, payload, keys, nonEXRedisCIDs);
    }
    catch (error) {
        throw error;
    }


    // If there are non-existent keys, fetch the counts from the database
    if (nonEXRedisCIDs.length > 0) {
        try {
            await getRatingFromMongo(payload, nonEXRedisCIDs);
        }
        catch (error) {
            throw error;
        }
    }

    // update new count to redis
    try{
        const tasks = [];
        for (const cid of nonEXRedisCIDs) {
            tasks.push(cluster.set(GEN_CARD_RATING_KEY(cid), payload[cid], "EX", TTL_IN_SECONDS, "NX"));
        }
        await Promise.all(tasks);
    }
    catch (error) {
        throw error;
    }

    return payload;
};

export default countRatingService;

const getRatingFromRedis = async (cids, payload, keys, nonEXRedisCIDs) => {
    // Try to get the count of ratings from Redis
    try {
        const redisCount = await Promise.all(
            keys.map((key) => {
                return cluster.get(key);
            })
        );

        // Update the result object with the counts from Redis
        redisCount.forEach((count, index) => {
            if (count !== null) {
                // If the count is not null, parse it and update the result object
                payload[cids[index]] = parseInt(count);
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

const getRatingFromMongo = async (payload, nonEXRedisCIDs) => {
    try {
        const userRate = await userRateModel.aggregate([
            {
                $match: {
                    cid: { $in: nonEXRedisCIDs }
                },
            },
            {
                $group: {
                    _id: "$cid",
                    count: { $sum: 1 },
                },
            },
        ]);

        userRate.forEach((item) => {
            payload[item._id] = item.count;
        });
    }
    catch (error) {
        throw error;
    }
}