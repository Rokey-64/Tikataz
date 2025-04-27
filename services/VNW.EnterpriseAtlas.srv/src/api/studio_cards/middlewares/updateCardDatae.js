import getModelService from "../../../services/getModelService.js";

/**
 * set image ids into the card data
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const updateCardData = async (req, res, next) => {
    const model = getModelService(req);
    const cardData = model.payload;

    // Set logo ID
    const checkExistLogo = req.files.find(file => file.fieldname === 'logo');
    if(checkExistLogo){
        cardData.general.logo = 'logo';
    }

    // update product images ID
    cardData.products = cardData.products.map(product => {
        return {
            id: product.id,
            name: product.name,
            position: product.position ,
        }
    });

    // Set customer images ID

    cardData.customers = cardData.customers.map(customer => {
        return {
            id: customer.id,
            custName: customer.custName,
            custAddress: customer.custAddress,
        }
    });

    next();
};

export default updateCardData;