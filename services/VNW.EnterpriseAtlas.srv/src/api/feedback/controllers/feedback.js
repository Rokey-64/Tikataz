import { Router } from "express";
import getModelService from "../../../services/getModelService.js";
import setFeedback from "../../../services/setFeedback.js";
import FeedbackSavingMiddleware from "../middlewares/feedbackSavingMiddleware.js";

const router = Router();

router.post("/", FeedbackSavingMiddleware, (req, res) => {
    /**
     * This route saves the feedback
     */
    res.status(200).json(setFeedback(req.feedback, true, "success", {}));
});

export default router;