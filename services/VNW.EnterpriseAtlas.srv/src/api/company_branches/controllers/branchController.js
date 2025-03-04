import { Router } from "express";
import BranchSeachingMiddleware from "../middlewares/branchSearchingMiddleware.js";
import BranchSavingMiddleware from "../middlewares/branchSavingMiddleware.js";
import BranchDeletingMiddleware from "../middlewares/branchDeletingMiddleware.js";
import getModelService from "../../../services/getModelService.js";
import setFeedback from "../../../services/setFeedback.js";

const router = Router();

router.get("/vmw/atlas/branch/find", BranchSeachingMiddleware, async (req, res) => {
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
    res.status(200).json(setFeedback(req.feedback, true, 'success', {"branches" : model.branches, "_id" : req.id}));
});

router.post("/vmw/atlas/branch/update", BranchSavingMiddleware, async (req, res) => {
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
    res.status(200).json(setFeedback(req.feedback, true, 'success', {"_id" : req.id}));
});

router.delete("/vmw/atlas/branch/delete", BranchDeletingMiddleware, async (req, res) => {
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
    res.status(200).json(setFeedback(req.feedback, true, 'success', {"_id" : req.id}));
});

export default router;