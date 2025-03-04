import { Router } from "express";
import ProfileSeachingMiddleware from "../middleware/profileSeachingMiddleware.js";
import getModelService from "../../../services/getModelService.js";
import setFeedback from "../../../services/setFeedback.js";
import ProfileSavingMiddleware from "../middleware/profileSavingMiddleware.js";

const router = Router();

router.get("/vmw/atlas/profile/find", ProfileSeachingMiddleware, async (req, res) => {
    /**
     * This route finds a profile by ID
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

    setFeedback(req.feedback, true, 'success', {"profile" : model.profile, "_id" : req.id});
    
    res.status(200).json(req.feedback);
});

router.post("/vmw/atlas/profile/update",ProfileSavingMiddleware, async (req, res) => {
    /**
     * This route creates a new profile and updates the database
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

    setFeedback(req.feedback, true, 'success', {"_id" : model._id});
    
    res.status(200).json(req.feedback);
});

export default router;