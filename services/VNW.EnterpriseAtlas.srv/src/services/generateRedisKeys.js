/***
 * THIS SERVICE IS FOR GENERATING REDIS KEYS OR ANY OTHER KEYS
 * 
 */

/**
 * 🔰🔰 This key is used to save the RFQ ID for comfirmation to Redis when the RFQ is created
 * @param {*} userID - The user ID from the request
 * @param {*} rfqID - The RFQ ID from the request
 * @returns 
 */
export const GENERATING_AURFQ_KEY = (userID, rfqID) => `${userID}-AURFQ-$${rfqID}`;

/**
 * 🔰🔰 This key is used to generate a blob name for RFQ attachment and upload them to Azure
 * @param {*} orderID - The order ID from the RFQ
 * @returns 
 */
export const GENERATING_AURFQ_ATTACHMENT_KEY = (orderID) => `${orderID}-attachment`;

/**
 * 🔰🔰 This key is used to generate a blob name for RFQ item and upload them to Azure
 * @param {*} orderID - The order ID from the RFQ
 * @param {*} originalname - The original name of the file(e.g. 0 1 2 3)
 * @returns 
 */
export const GENERATING_AURFQ_ITEM_KEY = (orderID, originalname) => `${orderID}-item-${originalname}`;

/**
 * 🔰🔰 This key is used to generate a blob name for Card logo
 * @param {*} cardID - The card ID
 * @returns 
 */
export const GENERATING_CARD_LOGO_KEY = (cardID) => `${cardID}-logo-logo`;

/**
 * This key is used to generate the blob name for the product image
 * @param {*} cardID - The card ID
 * @param {*} productID - The product ID
 * @returns 
 */
export const GENERATING_CARD_PRODUCT_KEY = (cardID, productID) => `${cardID}-products-${productID}`;

/**
 * This key is used to generate the blob name for the customer logo
 * @param {*} cardID 
 * @param {*} customerID 
 * @returns 
 */
export const GENERATING_CARD_CUSTOMER_KEY = (cardID, customerID) => `${cardID}-customers-${customerID}`;

/**
 * This key is used to generate the avatar for the leader profile
 * @param {*} id - The leader ID
 * @returns 
 */
export const GENERATING_CARD_AVATAR_KEY = (id) => `${id}_avatar`;

/**
 * 🔰🔰 This key is used to generate the blob name for the general card image, for example,
 * 🔰 case when the Card image type is a logo, the blob name will be `${cardID}-logo-logo`
 * 🔰 case when the Card image type is a product, the blob name will be `${cardID}-products-${productID}`
 * 🔰 case when the Card image type is a customer, the blob name will be `${cardID}-customers-${customerID}`
 * @param {*} id - The card ID
 * @param {*} fieldname - The field name of the image, for example, logo, products, customers
 * @param {*} originalname - The index of the image, for example, 0, 1, 2, 3 or specific name
 * @returns 
 */
export const GENERATING_CARD_BLOB_KEY = (id, fieldname, originalname) => `${id}-${fieldname}-${originalname}`;

/**
 * 🔰🔰 This key is used to generate the blob name for company logo
 * @param {*} userID 
 * @returns 
 */
export const GENERATING_COMPANY_LOGO_KEY = (userID) => `${userID}_company_logo`;

/**
 * Create a key for the RFQ pricing of the supplier
 * @param {*} oid - The order ID from the RFQ
 * @param {*} cid - Ther card ID from the RFQ
 * @returns 
 */
export const GENERATING_RFQ_LINK_KEY = (oid, cid) => `${oid}-RFQ-${cid}`;

/**
 * Define a Redis key for tracking the total number of card ratings
 * @param {*} cid - Ther card ID from the RFQ
 * @returns 
 */
export const GEN_CARD_RATING_KEY = (cid) => `CARD-RATING-${cid}`;

/**
 * Define a Redis key for tracking the total number of card reactions
 * @param {*} cid - Ther card ID from the RFQ
 * @returns 
 */
export const GEN_CARD_REACTION_KEY = (cid) => `CARD-REACTION-${cid}`;