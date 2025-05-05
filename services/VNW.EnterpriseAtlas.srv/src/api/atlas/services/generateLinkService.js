import createStorageService from "#@/services/strorages/createStorageService.js";
import { cluster } from "#@/databases/redis-jack.js";

/**
 * Create a new key for the product image
 * @param {*} key 
 * @returns 
 */
const generateLink = async (key) => {
    let redisLink = null;
    const storageService = createStorageService('images');

    try {
        // Check redis for the key
        redisLink = await cluster.get(key);
        if (!redisLink) {
            // generate a new link and store it in redis for 2 days
            redisLink = await storageService.generateDownloadLink(key, 60 * 24 * 2);

            // store the link in redis for 2 days
            await cluster.set(key, redisLink, 'EX', 60 * 60 * 24 * 2);
        }
    }
    catch (err) {
        throw err;
    }

    return redisLink;
};

export default generateLink;