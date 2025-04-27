import getModelService from "../../../services/getModelService.js";
import fs from 'fs';
import path from 'path';

/**
 * Create a json object to send to the database
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const prepareDataMiddleware = async (req, res, next) => {
    const model = getModelService(req);
    const order = model.convertOrder;
    const general = order.general;
    const pricing = order.pricing;
    const filter = order.filter;

    const payload = {
        id: order.id,
        order_name: general.orderName,
        order_address: general.orderAddress,
        start_date: general.orderCreatedAt.replaceAll('-', ''),
        end_date: general.orderDueDate.replaceAll('-', ''),
        order_remark: general?.orderRemark || "",
        attachment: model.attachment,
        opinion: model?.opinion || "",

        filter: {
            priority_time: filter?.priorityTime || false,
            priority_price: filter?.priorityPrice || false,
            priority_quality: filter?.priorityQuality || false,
            nation_id: filter?.targetCountry || 1, // Vietnam
            allowed_anothers: filter?.allowedAnothers || false,
            min_stars: filter?.minStars
        },

        pricing: pricing.map((item, index) => {
            return {
                item_name: item.itemName,
                qty: item.quantity,
                unit: item.unit,
                specification: item.specification || "",
                description: item.description || "",
                provider_codes: item.providerCode || [],
                hashtag: item.hashtag || [],
                image: item.itemImage ? index + 1 : 0
            };
        })
    }

    model.payload = payload;

    // try {
    //     fs.writeFileSync('payload.json', JSON.stringify(payload, null, 2), 'utf-8');
    //     console.log('File written successfully');
    // } catch (err) {
    //     console.error('Error writing to file', err);
    // }
    return next();
};

export default prepareDataMiddleware;