import setFeedback from "../../../services/setFeedback.js";
import { cluster } from '../../../databases/redis-jack.js';
import getModelService from "../../../services/getModelService.js";
import {GENERATING_AURFQ_KEY} from "../../../services/generateRedisKeys.js";

/**
 * This middleware checks the input RFQ (Request for Quotation) data before processing it.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const requestRFQValidMiddleware = async (req, res, next) => {
    const model = getModelService(req);
    const userID = req.userID;
    const order = JSON.parse(model.order);
    const general = order.general;
    const pricing = order.pricing;

    /**
     * *************************************
     * Define a nested function, that is used to trim whitespace from strings
     */
    const trimString = (str) => {
        if (typeof str === 'string') {
            return str.trim();
        }
        return '';
    }

    /**
     * *************************************
     * Validates the order ID in Redis, if it does not exist, return an error
     */
    // const key = `${userID}-RFQ-$${order?.id || ""}`;
    const key = GENERATING_AURFQ_KEY(userID, order?.id || "");
    
    const validKey = await cluster.get(key)
    if (!validKey) {
        return res.status(400).json(setFeedback(req.feedback, false));
    }

    /**
     * *************************************
     * Check required fields in general section of the order
     */
    if (
        trimString(general?.orderName) === '' ||
        trimString(general?.orderCreatedAt) === '' ||
        trimString(general?.orderDueDate) === '' ||
        trimString(general?.orderAddress) === ''
    ){
        return res.status(400).json(setFeedback(req.feedback, false));
    }

    /**
     * *************************************
     * Check date format
     */
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD format
    if (!dateRegex.test(general.orderCreatedAt) || !dateRegex.test(general.orderDueDate)) {
        return res.status(400).json(setFeedback(req.feedback, false));
    }
    
    /**
     * *************************************
     * Check required fields of the item list
     */
    if (pricing.length === 0) {
        return res.status(400).json(setFeedback(req.feedback, false));
    }

    /**
     * *************************************
     * Check required fields of the item list
     */
    for (let i = 0; i < pricing.length; i++) {
        const item = pricing[i];
        if (
            trimString(item?.itemName) === '' ||
            trimString(item?.quantity) === '' ||
            trimString(item?.unit) === ''
        ){
            return res.status(400).json(setFeedback(req.feedback, false));
        }
    }

    model.convertOrder = order;
    return next();
}

export default requestRFQValidMiddleware;