import getModelService from "../../../services/getModelService.js";
import setFeedback from "../../../services/setFeedback.js";
import initializeCardService from "../services/initializeCardService.js";

/**
 * This middleware is used to load the initial data for the card
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const loadingInitialData = async (req, res, next) => {
    const CARDS_LIMMIT = 3;
    const model = getModelService(req);

    /**
    * If there is no new card request, pass it
    */
    if (model.st !== 'n') {

        // not update or create
        if (model.st !== 'u')
            return req.status(400).json(setFeedback(req.feedback, false));

        return next();
    }
    
    const payload = {
        address: [],
        businessField: '',
        phone: '',
        email: '',
    };

    try {
        // Call the stored procedure to get the initial data
        const result = await initializeCardService(req.userID);

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
        // ⛔ TODO: Log the error here
        return res.status(500).json(setFeedback(req.feedback, false));
    }

    next();
};

export default loadingInitialData;