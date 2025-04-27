import getModelService from "../../../services/getModelService.js";
import setFeedback from "../../../services/setFeedback.js";
import loadBasicSettingService from "../services/loadBasicSettingService.js";

const BasicLoadingMiddleware = async (req, res, next) => {
    const model = getModelService(req);
    
    try{
        const result = await loadBasicSettingService(req.userID);
        if(result[0].length === 0){
            return res.status(400).json(setFeedback(req.feedback, false));
        }

        model.basicData = result[0];
       
    } catch (error) {
        return res.status(500).json(setFeedback(req.feedback, false));
    }

    return next();
};

export default BasicLoadingMiddleware;