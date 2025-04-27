import getModelService from "../../../services/getModelService.js";
import setFeedback from "../../../services/setFeedback.js";
import { showMessage } from "../../../databases/http_fluentd.js";
import updateRFQPricingService from "../services/updateRFQPricingService.js";

/**
 * This middleware is used to save the supplier pricing of the RFQ
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const supplierPricingMiddleware = async (req, res, next) => {
    const model = getModelService(req);
    const cid = model.cid;
    const oid = model.oid;
    if (!cid || !oid) {
        return res.status(400).json(setFeedback(req.feedback, false));
    }

    /* prepare data for submission
    * JSON TEXT TEMPLATE
    * {
    * 	'expansion':{
    * 		'deliveryRemark':'',
    * 		'paymentTerm':'',
    * 		'warrantyTerm':'',
    * 		'additionalRemark':'',
    *  	'evaluate':''
    *   },
    *	'items':[
    *		{
    *			'orderItemID':0,
    *			'orderItemID':0.00,
    *			'currencyID':1,
    *			'state':'',
    *		}
    *	 ]
    * }
    * */
    const payload = model.payload;

    // Check the payload before update it
    if (payload === null || payload === undefined) {
        return res.status(400).json(setFeedback(req.feedback, false));
    }

    // Check the items in the payload
    const items = payload.items;
    if (items === null || items === undefined || items.length === 0) {
        return res.status(400).json(setFeedback(req.feedback, false));
    }

    // Check item required fields
    for (let i = 0; i < items.length; i++) {
        const item = items[i];

        if (item?.state === "skipped")
            continue; // skip if state is skipped

        // price is required
        if (!item?.price || !item?.currencyID || !item?.orderItemID || !item?.state) {
            return res.status(400).json(setFeedback(req.feedback, false));
        }
    }
    
    try {
        const result = await updateRFQPricingService(cid, oid, payload);
        if (result[0].status === 0) {
            return res.status(400).json(setFeedback(req.feedback, false));
        }
    }
    catch (err) {
        showMessage("error", "Error getting supplier pricing", err);
        return res.status(400).json(setFeedback(req.feedback, false));
    }

    return next();
}

export default supplierPricingMiddleware;