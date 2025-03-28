import { showMessage } from "../../../databases/http_fluentd.js";
import getModelService from "../../../services/getModelService.js";
import cardModel from "../models/cardModel.js";
import initContainerCliAzure from "../../../services/initializeContainerClientAzure.js";
import createShortLinkRedis from "../../../services/createShortLinkRedis.js";
import _ from "lodash";


/**
 * Try to get the card by ID from the database
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const getCardByIDMiddleware = async (req, res, next) => {
    const model = getModelService(req);

    /**
     * Check valid
     */
    if (!model?.st) {
        return res.status(400).json(setFeedback(req.feedback, false));
    }

    /**
     * If there is no new card update, pass it
     */
    if (model.st !== 'u') {
        return next();
    }

    try {
        /**
         * Fetch the card by ID
         */
        const card = await cardModel.findOne({ _id: model?.id }).lean();

        if (!card) {
            return res.status(404).json(setFeedback(req.feedback, false));
        }
        
        model.payload = card;
    }
    catch (err) {
        showMessage('error', 'Error occurred while fetching card by ID', err);
        return res.status(500).json(setFeedback(req.feedback, false));
    }

    /**
     * Normalization the card data
     */
    await setShortLink(model.payload);

    /**
     * Set the new card data to the model
     */
    const newCard = {
        id: model.payload._id.toString(),
        general: model.payload.general,
        products: model.payload.products,
        customers: model.payload.customers,
        certificates: model.payload.certificates,
        category: model.payload.category,
    };

    model.payload = newCard;
    return next();
};

const setShortLink = async (payload) => {
    // const newCard = _.cloneDeep(payload);
    const containerClient = initContainerCliAzure('images');
    const cardID = payload._id.toString();

    // Get the logo short link 
    const blobKey = `${cardID}-logo-logo`;
    payload.general.logo = await createShortLinkRedis(blobKey, containerClient);

    // get the product short link
    for (const product of payload.products) {
        const blobKey = `${cardID}-products-${product.id}`;
        product.image = await createShortLinkRedis(blobKey, containerClient);
    }

    // get the customer short link
    for (const customer of payload.customers) {
        const blobKey = `${cardID}-customers-${customer.id}`;
        customer.custLogo = await createShortLinkRedis(blobKey, containerClient);
    }
}

export default getCardByIDMiddleware;