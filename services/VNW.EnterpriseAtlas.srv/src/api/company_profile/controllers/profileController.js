import { Router } from "express";
import multer from "multer";
import ProfileSeachingMiddleware from "../middleware/profileSeachingMiddleware.js";
import getModelService from "../../../services/getModelService.js";
import setFeedback from "../../../services/setFeedback.js";
import ProfileSavingMiddleware from "../middleware/profileSavingMiddleware.js";
import uploadLogoMiddleware from "../middleware/uploadLogoMiddleware.js";
import checkFieldRequestMiddleware from "../middleware/checkFieldRequestMiddleware.js";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", ProfileSeachingMiddleware, async (req, res) => {
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

    ;
    
    res.status(200).json(setFeedback(req.feedback, true, 'success', {"profile" : model.profile, "_id" : req.id}));
});

router.post("/", upload.any(), checkFieldRequestMiddleware, uploadLogoMiddleware, ProfileSavingMiddleware, async (req, res) => {
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
    
    res.status(200).json(setFeedback(req.feedback, true, 'success', {"_id" : req.id}));
});


export default router;