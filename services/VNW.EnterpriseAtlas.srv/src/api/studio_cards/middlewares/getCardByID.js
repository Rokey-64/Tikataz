import { showMessage } from "../../../databases/http_fluentd.js";
import getModelService from "../../../services/getModelService.js";
import cardModel from "../../../models/mongoo/cardModel.js";
// import initContainerCliAzure from "../../../services/initializeContainerClientAzure.js";
import createStorageService from "../../../services/strorages/createStorageService.js";
import createShortLinkRedis from "../../../services/createShortLinkRedis.js";
import { GENERATING_CARD_LOGO_KEY, GENERATING_CARD_PRODUCT_KEY, GENERATING_CARD_CUSTOMER_KEY } from "../../../services/generateRedisKeys.js";
import _ from "lodash";


/**
 * Try to get the card by ID from the database
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const getCardByID = async (req, res, next) => {
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
    /**
     * Modify by LINH on 04-03-2025
     * Description: Use the storage service to create short link instead of the azure storage client directly.
     * 
     * // const containerClient = initContainerCliAzure('images');
     */
    const storageService = createStorageService('images');
    const cardID = payload._id.toString();

    /**
     * Modify by LINH on 04-03-2025
     * Description: Make the blob key more readable by using the GENERATE function.
     * 
     *  // const blobKey = `${cardID}-logo-logo`;
     */
    const blobKey = GENERATING_CARD_LOGO_KEY(cardID);

    payload.general.logo = await createShortLinkRedis(blobKey, storageService);

    // get the product short link
    for (const product of payload.products) {
        /**
         * Modify by LINH on 04-03-2025
         * Description: Make the blob key more readable by using the GENERATE function.
         * 
         *  // const blobKey = `${cardID}-products-${product.id}`;
         */
        const blobKey = GENERATING_CARD_PRODUCT_KEY(cardID, product.id);
        product.image = await createShortLinkRedis(blobKey, storageService);
    }

    // get the customer short link
    for (const customer of payload.customers) {
        /**
         * Modify by LINH on 04-03-2025
         * Description: Make the blob key more readable by using the GENERATE function.
         * 
         *  // const blobKey = `${cardID}-customers-${customer.id}`;
         */
        const blobKey = GENERATING_CARD_CUSTOMER_KEY(cardID, customer.id);
        customer.custLogo = await createShortLinkRedis(blobKey, storageService);
    }
}

export default getCardByID;