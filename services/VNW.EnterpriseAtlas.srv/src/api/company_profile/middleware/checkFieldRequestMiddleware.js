
import getModelService from "../../../services/getModelService.js";
import setFeedback from "../../../services/setFeedback.js";

/**
 * Check whether the required fields are missing or not
 * @param {C} req 
 * @param {*} res 
 * @param {*} next 
 */
const checkFieldRequestMiddleware = (req, res, next) => {
    const model = getModelService(req);
    const rawProfile = model.profile;
    let profile = {};
    
    try{
        profile = JSON.parse(rawProfile);
    }
    catch(err){
        return res.status(400).json(setFeedback(req.feedback));
    }

    /**
     * Check if the required fields are missing
     */
    if (!profile?.name
        || !profile?.taxCode
        || !profile?.date
        || !profile?.address
        || !profile?.phone
        || !profile?.email) {
        return res.status(400).json(setFeedback(req.feedback));
    };

    model.profile = profile;
    return next();

}

export default checkFieldRequestMiddleware;