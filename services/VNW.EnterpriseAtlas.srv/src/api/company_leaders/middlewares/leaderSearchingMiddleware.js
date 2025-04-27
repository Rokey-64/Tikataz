import setFeedback from "../../../services/setFeedback.js";
import getModelService from "../../../services/getModelService.js";
import { showMessage } from "../../../databases/http_fluentd.js";
import { GENERATING_CARD_AVATAR_KEY } from "../../../services/generateRedisKeys.js";
import createShortLinkRedis from "../../../services/createShortLinkRedis.js";
import createStorageService from "../../../services/strorages/createStorageService.js";
import searchLeaderService from "../services/searchLeaderService.js";

/**
 * This middleware is used to search the branch of the company
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const LeaderSeachingMiddleware = async (req, res, next) => {
    const model = getModelService(req);
    const storageService = createStorageService("images");
    const leaders = [];

    try {
        const result = await searchLeaderService(req.userID);

        if (result[0].length === 0) {
            return res.status(404).json(setFeedback(model, false));
        }

        /**
         * Create the branch template that suits the response
         */
        for(const item of result){
            const blobKey = GENERATING_CARD_AVATAR_KEY(item.id);
            const shortLink = await createShortLinkRedis(blobKey, storageService);

            leaders.push({
                id: item.id,
                name: item.name,
                position: item.position,
                date: item.date,
                phone: item.phone_number,
                email: item.email,
                slogan: item.slogan,
                logo: shortLink,
            });
        }
    }
    catch (err) {
        showMessage("LeaderSeachingMiddleware", err);
        return res.status(500).json(setFeedback(model, false));
    }

    model.leaders = leaders;
    next();
};

export default LeaderSeachingMiddleware;