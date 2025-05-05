import {
    GENERATING_CARD_PRODUCT_KEY
} from "#@/services/generateRedisKeys.js";
import { cluster } from "#@/databases/redis-jack.js";
import setFeedback from '#@/services/setFeedback.js'
import getModelService from '#@/services/getModelService.js'
import generateLink from '../services/generateLinkService.js';

/**
 * * Generate a URL for the product image by index
 * * @param {number} index - The index of the product image
 * * @param {string} cid - The card ID
 * @returns 
 */
const generateURLByIndex = async (req, res, next) => {
    const model = getModelService(req);
    // const cid = model.cid;
    // const productID = model.id;
    const { cid, productID } = req.params;
    let prodURL = '';

    if (!cid || !productID) {
        return res.status(400).json(setFeedback(req.feedback, false));
    }
    const key = GENERATING_CARD_PRODUCT_KEY(cid, productID);

    /**
     * * Try to get the link from redis first
     * * If the link is not found, generate a new link and store it in redis for 30 minutes
     * * If the link is found, return the link
     */
    try{
        prodURL = await cluster.get(key);
        if (!prodURL) {
            prodURL = await generateLink(key) || '';
        }
    }
    catch (err) {
        return res.status(500).json(setFeedback(req.feedback, false, 'error', { error: err.message }));
    }

    model.prodURL = prodURL;
    return next();
}

export default generateURLByIndex;

