import { Router } from "express";
import getModelService from "../../../services/getModelService.js";
import setFeedback from "../../../services/setFeedback.js";

import questionsLoadingMiddleware from "../middlewares/questionsLoadingMiddleware.js";
import BasicLoadingMiddleware from "../middlewares/basicLoadingMiddleware.js";
import QuestionSavingMiddleware from "../middlewares/questionSavingMiddleware.js";
import basicSavingMiddleware from "../middlewares/basicSavingMiddleware.js";

const router = Router();

router.get("/privacy", questionsLoadingMiddleware('privacy'), (req, res) => {
    /**
     * This route loads privacy settings
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

    res.status(200).json(setFeedback(req.feedback, true, 'success', {"privacy" : model.questions}));
});

router.get("/announce", questionsLoadingMiddleware('announce'), (req, res) => {
    /**
     * This route loads announce settings
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
    res.status(200).json(setFeedback(req.feedback, true, 'success', {"announce" : model.questions}));
});

router.get("/basic", BasicLoadingMiddleware, (req, res) => {
    /**
     * This route loads basic settings
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
    res.status(200).json(setFeedback(req.feedback, true, 'success', {"basic" : model.basicData}));
});


router.post("/privacy", QuestionSavingMiddleware, (req, res) => {
    /**
     * This route saves privacy settings
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

    res.status(200).json(setFeedback(req.feedback, true, 'success', {}));
});

router.post("/announce", QuestionSavingMiddleware, (req, res) => {
    /**
     * This route saves announce settings
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

    res.status(200).json(setFeedback(req.feedback, true, 'success', {}));
});

router.post("/basic", basicSavingMiddleware, (req, res) => {
    /**
     * This route saves basic settings
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

    res.status(200).json(setFeedback(req.feedback, true, 'success', {}));
});

export default router;