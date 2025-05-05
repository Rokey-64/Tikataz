
import { cluster } from "#@/databases/redis-jack.js";
import setFeedback from '#@/services/setFeedback.js'
import getModelService from '#@/services/getModelService.js'
import generateLink from '../services/generateLinkService.js';

/**
 * * Generate a list of URL from a list of product keys
 * * @param {number} index - The index of the product image
 * * @param {string} cid - The card ID
 * @returns 
 */
const generateProdURLs = async (req, res, next) => {
    const model = getModelService(req);
    const cid = model.cid;
    const productKeys = model.keys;
    const payload = [];

    if (!cid || !productKeys || productKeys?.length === 0) {
        return res.status(400).json(setFeedback(req.feedback, false));
    }

    /**
     * * Try to get the link from redis first
     * * If the link is not found, generate a new link and store it in redis for 30 minutes
     * * If the link is found, return the link
     */
    try{
        for (const key of productKeys) {
            let prodURL = await cluster.get(key);
            if (!prodURL) {
                prodURL = await generateLink(key) || '';
            }
            payload.push({
                key: key,
                url: prodURL
            });
        }
    }
    catch (err) {
        return res.status(500).json(setFeedback(req.feedback, false, 'error', { error: err.message }));
    }

    model.payload = payload;
    return next();
}

export default generateProdURLs;

