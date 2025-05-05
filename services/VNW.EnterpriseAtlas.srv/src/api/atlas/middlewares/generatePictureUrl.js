import {
    GENERATING_CARD_PRODUCT_KEY,
    GENERATING_CARD_LOGO_KEY,
    GENERATING_CARD_CUSTOMER_KEY
} from "#@/services/generateRedisKeys.js";
import getModelService from '#@/services/getModelService.js'
import CommonCardTemplate from '../services/card_base/templateService.js'
import generateLink from '../services/generateLinkService.js';

/**
 * Generates the picture URL for the model if the picture is located in Azure Blob Storage.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const generatePictureUrl = async (req, res, next) => {
    const model = getModelService(req);
    const base = model.payload.base || [];
    const MAX_CUSTOMER_SIZE = 9;
    const MAX_PRODUCT_SIZE = 3;


    if (base && base.length > 0) {
        for (const item of base) {
            if (item.ctype === CommonCardTemplate.ctype.auto) continue;
            const cardData = item.data;

            // Set the logo url
            if (cardData.general.logo) {
                const logoKey = GENERATING_CARD_LOGO_KEY(item.cid);
                try {
                    cardData.general.logo = await generateLink(logoKey) || cardData.general.logo;
                } catch (error) {
                    showMessage('generatePictureUrl', 'The logo is not found in the database');
                }
            }

            // Set the product url
            if (cardData.products && cardData.products.length > 0) {
                // Sort the products by id before generating the link
                cardData.products.sort((product1, product2) => {return product1.id - product2.id;});
                
                for (let index = 0; index < cardData.products.length; index++) {
                    const product = cardData.products[index];
                    const productKey = GENERATING_CARD_PRODUCT_KEY(item.cid, product.id);
                    product.key = productKey;

                    // limit the number of products to 3 for the first generation
                    if (index + 1 > MAX_PRODUCT_SIZE) {continue;}

                    product.link = await generateLink(productKey) || '';
                }
            }

            // Set the customer url
            if (cardData.customers && cardData.customers.length > 0) {

                for (let index = 0; index < cardData.customers.length; index++) {
                    const customer = cardData.customers[index];
                    const customerKey = GENERATING_CARD_CUSTOMER_KEY(item.cid, customer.id);
                    customer.key = customerKey;
                    customer.link = null
                    if (index + 1 >= MAX_CUSTOMER_SIZE) break;
                }
            }
        }
    }

    return next();
}

export default generatePictureUrl;