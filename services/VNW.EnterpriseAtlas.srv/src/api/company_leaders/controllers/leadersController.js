import { Router } from "express";
import multer from "multer";
import setFeedback from "../../../services/setFeedback.js";
import LeaderSeachingMiddleware from "../middlewares/leaderSearchingMiddleware.js";
import leaderSavingMiddleware from "../middlewares/leaderSavingMiddleware.js";
import LeaderDeletingMiddleware from "../middlewares/leaderDeletingMiddleware.js";
import getModelService from "../../../services/getModelService.js";
import uploadAvatarMiddleware from "../middlewares/uploadAvatarMiddleware.js";
import checkDataMiddleware from "../middlewares/checkDataMiddleware.js";
import leaderLogoDeleteMiddleware from "../middlewares/leaderLogoDeleteMiddleware.js";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/vmw/atlas/leader/find", LeaderSeachingMiddleware, async (req, res) => {
    /**
     * This route finds a branch by ID
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
    res.status(200).json(setFeedback(req.feedback, true, 'success', {"leaders" : model.leaders}));
});

router.post("/vmw/atlas/leader/update", upload.any(), checkDataMiddleware, leaderSavingMiddleware, uploadAvatarMiddleware, async (req, res) => {
    /**
     * This route creates a new branch and updates the database
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
    res.status(200).json(setFeedback(req.feedback, true, 'success', {id: model.data.id}));
});

router.delete("/vmw/atlas/leader/delete", LeaderDeletingMiddleware, leaderLogoDeleteMiddleware, async (req, res) => {
    /**
     * This route deletes a branch by ID
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
    res.status(200).json(setFeedback(req.feedback, true, 'success', {}));
});

export default router;