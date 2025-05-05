import getModelService from "../../../services/getModelService.js";
import setFeedback from "../../../services/setFeedback.js";
import { showMessage } from "../../../databases/http_fluentd.js";
import createStorageService from "../../../services/strorages/createStorageService.js";
import { GENERATING_AURFQ_ITEM_KEY } from "../../../services/generateRedisKeys.js";
import { cluster } from "../../../databases/redis-jack.js";

/**
 * This middleware is used to get a short link for the item image from Storage Service.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const orderDisplayGetLinkMiddleware = async (req, res, next) => {
    const model = getModelService(req);
    const storageService = createStorageService('images');

    for (let i = 0; i < model.payload.length; i++) {
        const item = model.payload[i];

        // the image is not exist, skip it
        if (item.itemImage === 0) continue;

        // Get the original name of the image
        const originalname = item.itemImage - 1;

        // Get the key for the image
        const key = GENERATING_AURFQ_ITEM_KEY(model.id, originalname);

        // Check redis for the key
        const redisLink = await cluster.get(key);
        if (redisLink) {
            item.shortLink = redisLink;
            continue;
        }

        try {
            const shortLink = await storageService.generateDownloadLink(key, 60 * 24 * 2);
            if (shortLink) {
                item.shortLink = shortLink;
                // Store the short link in redis for 2 days
                await cluster.set(key, shortLink, 'EX', 60 * 60 * 24 * 2, 'NX');
            }
            else {
                showMessage("error", "Error get short link", "No data found");
                return res.status(400).json(setFeedback(req.feedback, false));
            }
        }
        catch (err) {
            showMessage("error", "Error get short link", err);
            return res.status(400).json(setFeedback(req.feedback, false));
        }
    }

    return next();
}

export default orderDisplayGetLinkMiddleware;