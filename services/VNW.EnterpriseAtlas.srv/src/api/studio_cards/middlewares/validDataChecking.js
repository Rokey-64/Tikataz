import getModelService from "../../../services/getModelService.js";
import setFeedback from "../../../services/setFeedback.js";
import {showMessage} from '../../../databases/http_fluentd.js';

/**
 * Check the card input data before updating the card to the database
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const validDataChecking = async (req, res, next) => {
    const model = getModelService(req);
    const card = model.payload;

    // Check if the required fields are missing
    if(!card?.general?.branchName || !card?.general?.email || !card?.general?.phone || !card?.general?.address?.length){
        showMessage('validDataCheckingMiddleware', 'missing required fields general');
        return res.status(400).json(setFeedback(req.feedback, false));
    }

    // Check if it exists, it must be valid
    const certsLength = card?.certificates?.length;
    if(certsLength){
        for(const cert of card.certificates){
            if(!cert?.certype ){
                showMessage('validDataCheckingMiddleware', 'missing required fields certificates');
                return res.status(400).json(setFeedback(req.feedback, false));
            }
        }
    }

    // If the production list has any elements, check whether the required fields are missing or not
    const productsLength = card?.products?.length;
    if(productsLength){
        for(const product of card.products){
            // limit the position to 0-8
            const validPositions = new Set([0, 1, 2, 3, 4, 5, 6, 7, 8]);
            if(!product?.image || !validPositions.has(Number(product?.id || 0))){
                showMessage('validDataCheckingMiddleware', 'missing required fields products');
                return res.status(400).json(setFeedback(req.feedback, false));
            }
        }
    }

    // If the customer list has any elements, check whether the required fields are missing or not
    const custsLength = card?.customers?.length;
    if(custsLength){
        for(const cust of card.customers){
            const validPositions = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
            if(!cust?.custName || !validPositions.has(Number(cust?.id || 0))){
                showMessage('validDataCheckingMiddleware', 'missing required fields customers');
                return res.status(400).json(setFeedback(req.feedback, false));
            }
        }
    }

    next();
};

export default validDataChecking;