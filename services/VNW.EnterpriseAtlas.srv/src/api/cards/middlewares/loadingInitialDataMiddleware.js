import getModelService from "../../../services/getModelService.js";
import setFeedback from "../../../services/setFeedback.js";
import mysqlConn from "../../../databases/mysql-jack.js";
import { QueryTypes } from "sequelize";

/**
 * This middleware is used to load the initial data for the card
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const loadingInitialDataMiddleware = async (req, res, next) => {
    const model = getModelService(req);
    const userID = "dkebsheu1sed55a8wwd5+";

    const payload = {
        address: [],
        businessField: '',
        phone: '',
        email: '',
    };

    try {
        // Call the stored procedure to get the initial data
        const result = await mysqlConn.query(`call spGetInitialCardData(:gUserID)`,
            {
                type: QueryTypes.RAW,
                replacements: {
                    gUserID: userID
                }
            });

        for (let i = 0; i < result.length; i++) {
            const data = result[i];
            payload.address.push(data['address']);

            if (data['email'] && !payload.email) 
                payload.email = data['email'];

            if (data['phone_number'] && !payload.phone)
                payload.phone = data['phone_number'];

            if (data['business_field'] && !payload.businessField)
                payload.businessField = data['business_field'];
        }

        model.payload = payload;
    }
    catch (err) {
        return res.status(500).json(setFeedback(req.feedback, false, err.message, {}));
    }

    next();
};

export default loadingInitialDataMiddleware;