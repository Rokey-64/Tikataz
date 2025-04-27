import { Types } from "mongoose";
import getModelService from "../../../services/getModelService.js";
import setFeedback from "../../../services/setFeedback.js";
import cardModel from "../../../models/mongoo/cardModel.js";
import { showMessage } from "../../../databases/http_fluentd.js";

/**
 * Check whether or not the user's cards are over the limit
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const overLimmitCard = async (req, res, next) => {
    const CARDS_LIMMIT = 3;
    const model = getModelService(req);
    const cardID = model?.payload?.id;

    console.log("💥💥 overLimmitCardMiddleware is not ready yet");

    /**
     * If the card is being updated, the current card must be excluded from the count
     */
    const query = { user_id: req.userID };
    if (cardID) {
        try {
            // const objID = new Types.ObjectId(cardID);
            query._id = cardID;

            const counts = await cardModel.countDocuments(query);
            if (counts !== 1) {
                return res.status(400).json(setFeedback(req.feedback, false));
            }
        }
        catch (err) {
            showMessage('overLimmitCardMiddleware', err);
            return res.status(500).json(setFeedback(req.feedback, false));
        }
    }
    /**
     * If the card is being created, the count must be checked
     */
    else {
        try {

            const counts = await cardModel.countDocuments(query);

            if (counts >= CARDS_LIMMIT) {
                return res.status(400).json(setFeedback(req.feedback, false, 'error', { message: 'card_limit' }));
            }
        }
        catch (err) {
            showMessage('overLimmitCardMiddleware', err);
            return res.status(500).json(setFeedback(req.feedback, false));
        }
    }
    return next();
};

export default overLimmitCard;