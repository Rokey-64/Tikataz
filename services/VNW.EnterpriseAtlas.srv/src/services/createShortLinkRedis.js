import { showMessage } from "../databases/fluentd-jack.js";
import { getRedisKey, setRedisKeyOveride } from "../databases/redis-jack.js";
import createShortLinkAzureStorage from "./createShortLinkAzureStorage.js";

/**
 * Get the image link from redis first, if not found, create an image url from azure storage
 * @param {*} blobKey 
 * @param {*} containerClient 
 * @returns 
 */
const createShortLinkRedis = async (blobKey, containerClient) => {
    const redisKey = `${blobKey}`;
    let shortLink = '';

    try {
        shortLink = await getRedisKey(redisKey);
        if (shortLink) return shortLink;

        shortLink = await createShortLinkAzureStorage(blobKey, containerClient);
        if(!shortLink) return '';

        await setRedisKeyOveride(redisKey, shortLink, 60 * 30);
    }
    catch (err) {
        showMessage('setInlineCardDefaultData', err);
    }
    
    return shortLink;
}

export default createShortLinkRedis;