import getModelService from "../../../services/getModelService.js";
import setFeedback from "../../../services/setFeedback.js";
import { showMessage } from "../../../databases/http_fluentd.js";
import { GENERATING_AURFQ_KEY } from "../../../services/generateRedisKeys.js";
import { cluster } from '../../../databases/redis-jack.js';
import initRFQOrderService from "../services/initRFQOrderService.js";

/**
 * Prepare the first data for the request for quotation (RFQ) process
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const loadInitDataMiddleware = async (req, res, next) => {
    const model = getModelService(req);
    
    try {
        const result = await initRFQOrderService(req.userID);
        const resultData = result[0];

        // If user's profile is not found, delete the key from Redis
        if(!resultData.org || !resultData.tax) {
            const key = GENERATING_AURFQ_KEY(req.userID, model.id);
            await cluster.del(key);
        }
        
        // However, the process will be continued, but the user will be required to update their profile
        const payload = {
            addr: resultData?.address || '',
            org: resultData?.org || '',
            tax: resultData?.tax || ''
        }

        model.payload = payload;
    }
    catch (err) {
        showMessage("Error loadInitDataMiddleware", err);
        return res.status(400).json(setFeedback(req.feedback, false));
    }

    return next();
}

export default loadInitDataMiddleware;