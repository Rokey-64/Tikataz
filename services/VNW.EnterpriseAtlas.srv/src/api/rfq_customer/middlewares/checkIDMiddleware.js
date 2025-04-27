import { GENERATING_AURFQ_KEY } from "../../../services/generateRedisKeys.js";
import getModelService from "../../../services/getModelService.js";
import setFeedback from "../../../services/setFeedback.js";
import { cluster } from '../../../databases/redis-jack.js';
import { showMessage } from "../../../databases/http_fluentd.js";


/**
 * This middleware checks if the ID is valid for the user.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const checkIDMiddleware = async (req, res, next) => {
    const model = getModelService(req);
    const rfqID = model.id;
    const userID = req.userID;
    const key = GENERATING_AURFQ_KEY(userID, rfqID);

    const validKey = await cluster.get(key)
    if (!validKey) {
        showMessage("error", "Error checking ID in Redis");
        return res.status(400).json(setFeedback(req.feedback, false));
    }

    return next();
}

export default checkIDMiddleware;