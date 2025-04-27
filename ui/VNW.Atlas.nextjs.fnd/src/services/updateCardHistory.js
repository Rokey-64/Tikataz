
/**
 * Create a list of image that was uploaded to server
 * @param {*} card 
 * @param {*} payload 
 * @returns 
 */
const updateCardHistory = (card, payload) => {
    let history = []

    // push logo
    if (payload?.logo) {
        history.push(card.general.logo);
    }

    // push productions
    const products = card.products
        ?.filter(product => payload?.[product.id])
        ?.map(product => product.image);

    // push customers
    const customers =  card.customers
        ?.filter(customer => payload?.[customer.id])
        ?.map(customer => customer.custLogo)

    products.forEach(path => {history.push(path)});
    customers.forEach(path => {history.push(path)});

    return history
};

export default updateCardHistory;