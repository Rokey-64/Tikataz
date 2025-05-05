import { Router } from "express"
import getModelService from "../../services/getModelService.js";
import setFeedback from "../../services/setFeedback.js";
import LoadDataMiddleware from "./timezoneMiddleware.js";

const router = Router();

router.get("/", LoadDataMiddleware, (req, res) => {
    /**
     * This route finds the timezone
     * 
     * {
     *   // Required fields
     * }
     *  
     * 
     * 
     * Example request:
     *  
     * /
     * */
    const model = getModelService(req);
    res.status(200).json(setFeedback(req.feedback, true, 'success', {"timezones" : model.timezone}));
});

export default router;