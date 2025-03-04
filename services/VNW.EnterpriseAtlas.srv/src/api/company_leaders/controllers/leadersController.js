import { Router } from "express";
import LeaderSeachingMiddleware from "../middlewares/leaderSearchingMiddleware.js";
import LeaderSavingMiddleware from "../middlewares/leaderSavingMiddleware.js";
import LeaderDeletingMiddleware from "../middlewares/leaderDeletingMiddleware.js";
import getModelService from "../../../services/getModelService.js";
import setFeedback from "../../../services/setFeedback.js";

const router = Router();

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

router.post("/vmw/atlas/leader/update", LeaderSavingMiddleware, async (req, res) => {
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
    res.status(200).json(setFeedback(req.feedback, true, 'success', {}));
});

router.delete("/vmw/atlas/leader/delete", LeaderDeletingMiddleware, async (req, res) => {
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