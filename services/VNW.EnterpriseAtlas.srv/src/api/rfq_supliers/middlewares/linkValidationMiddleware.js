import setFeedback from "../../../services/setFeedback.js";
import _AutoCardModel from "../models/atoCardModel.js";
import { showMessage } from "../../../databases/http_fluentd.js";
import getModelService from "../../../services/getModelService.js";
import { getJwtGenerator } from "../../../services/jwt/jwtGenerator.js";
import { GENERATING_RFQ_LINK_KEY } from "../../../services/generateRedisKeys.js";
import { cluster } from "../../../databases/redis-jack.js";

/**
 * Check the link validation middleware
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const linkValidationMiddleware = async (req, res, next) => {
    const model = getModelService(req);
    const genKey = await getJwtGenerator();
    let data = null;
    try {
        // Check if the token is valid
        data = await genKey.verifyToken(model.token);

        model.oid = data?.oid;
        model.cid = data?.cid;
        model.sid = data?.sid;
    }
    catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json(setFeedback(req.feedback, false, "error", { error: "Link expired" }));
        }

        return res.status(400).json(setFeedback(req.feedback, false, "error", { error: err.message }));
    }

    // Check if the token is expired
    if (process.env.NODE_ENV === "production") {
        const key = GENERATING_RFQ_LINK_KEY(data?.oid, data?.cid);
        const redisData = await cluster.get(key);
        if (!redisData) {
            return res.status(401).json(setFeedback(req.feedback, false, "error", { error: "Link expired" }));
        }
    }

    return next();
}

export default linkValidationMiddleware;