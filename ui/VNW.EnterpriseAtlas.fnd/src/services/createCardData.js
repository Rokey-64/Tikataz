import cloneDeep from "lodash/cloneDeep";

/**
 * Create an object to send the card data to the server as a JSON object
 * @param {*} card - The card data 💦💤 check from redux/cardsSlice.js
 * @param {*} payload - The payload data that contains the image storage identities
 */
const createCardData = (card, payload) => {
    const cardData = cloneDeep(card);
    delete cardData.history;

    // Set logo ID
    cardData.general.logo = payload?.logo;

    // Set product images ID
    cardData.products.items = cardData.products.items
    .filter(product => payload?.[product.id])
    .map((product, index) => (
        {
            id: product.id,
            name: product.name,
            pos: product.position,
        }
    ));

    // Set customer images ID
    cardData.customers.manual = cardData.customers.manual
        .filter(customer => payload?.[customer.id])
        .map(customer => (
            {
                id: customer.id,
                name: customer.custName,
                address: customer.custAddress,
            }
        ))

    return cardData;
};

export default createCardData;