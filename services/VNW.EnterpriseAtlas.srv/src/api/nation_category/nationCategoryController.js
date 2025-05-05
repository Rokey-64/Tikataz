import { Router } from "express";
import LoadDataMiddleware from "./loadDataMiddleware.js";
import getModelService from "../../services/getModelService.js";
import setFeedback from "../../services/setFeedback.js";

const router = Router();

router.get("/", LoadDataMiddleware, async (req, res) => {
    /**
     * This route handler expects ...
     * 
     * {
     *   // Required fields
     *   token: <string>
     * }
     *  
     * 
     * 
     * Example request:
     * /otp/cnf?t...
     *  
     * /
     * */
    const model = getModelService(req);

    setFeedback(req.feedback, true, 'success', {"nations" : model.nation});
    
    res.status(200).json(req.feedback);
});

export default router;