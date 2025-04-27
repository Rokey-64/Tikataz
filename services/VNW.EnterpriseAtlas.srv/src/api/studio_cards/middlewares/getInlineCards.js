import setFeedback from "../../../services/setFeedback.js";
import cardModel from "../../../models/mongoo/cardModel.js";
import { showMessage } from "../../../databases/http_fluentd.js";

/**
 * Load the inline cards from the database
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const getInlineCards = async (req, res, next) => {
    let cards = [];
    try {
        cards = await cardModel.find(
            { user_id: req.userID },
            { "state": 1, "general.logo": 1, "general.branchName": 1, "general.description": 1, "createdAt": 1 }
        ).lean();

        if (!cards) {
            return res.status(404).json(setFeedback(req.feedback, false));
        }

        req.inlineCards = cards;
    }
    catch (err) {
        showMessage('getInlineCardsMiddleware', err);
        return res.status(500).json(setFeedback(req.feedback, false));
    }


    next();
}

export default getInlineCards;