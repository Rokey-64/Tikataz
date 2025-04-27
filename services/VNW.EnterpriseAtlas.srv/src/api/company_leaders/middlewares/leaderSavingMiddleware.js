import getModelService from "../../../services/getModelService.js";
import setFeedback from "../../../services/setFeedback.js";
import { showMessage } from "../../../databases/http_fluentd.js";
import saveLeaderService from "../services/saveLeaderService.js";
import {GENERATING_CARD_AVATAR_KEY} from "../../../services/generateRedisKeys.js";

/**
 * This middleware is used to save the branch of the company
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const leaderSavingMiddleware = async (req, res, next) => {
    const model = getModelService(req);
    const data = model.data;

    const key = GENERATING_CARD_AVATAR_KEY(data.id);

    try {
        const result = await saveLeaderService({
            gid: data.id,
            uid: req.userID,
            name: data.name,
            position: data.position,
            date: data.date?.replace(/-/g, "") || "",
            phone: data.phone,
            email: data.email,
            slogan: data.slogan,
            logo: key,
            state: model.state
        })

        if (result[0].status === 0) {
            showMessage(result[0].message);
            return res.status(400).json(setFeedback(req.feedback, false));
        }
    }
    catch (err) {
        showMessage(err);
        return res.status(500).json(setFeedback(req.feedback, false));
    }

    next();
};

export default leaderSavingMiddleware;