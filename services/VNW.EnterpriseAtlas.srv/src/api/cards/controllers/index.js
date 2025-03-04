import { Router } from "express";
import multer from "multer";
import getModelService from "../../../services/getModelService.js";
import setFeedback from "../../../services/setFeedback.js";
import loadingInitialDataMiddleware from "../middlewares/loadingInitialDataMiddleware.js";
import FileCachingMiddleware from "../middlewares/fileCachingMiddleware.js";

const router = Router();
const upload = multer({storage: multer.memoryStorage()});

router.get("/vmw/me/card/init", loadingInitialDataMiddleware, (req, res) => {
    /**
     * This route handler expects a GET request with the following query parameters:
     * 
     * {
     *   // Required fields
     *   token: 
     * }
     *
     *  Example request:
     *  
     *
     */
    const model = getModelService(req);
    res.status(200).json(setFeedback(req.feedback, true, 'success', {"payload" : model.payload}));
});

router.post("/vmw/me/card/update/image",upload.any(), FileCachingMiddleware, (req, res) => {
    /**
     * This route handler expects a POST request with the following query parameters:
     * 
     * {
     *   // Required fields
     *   token: 
     * }
     *
     *  Example request:
     *  
     *
     */
    const model = getModelService(req);
    res.status(200).json(setFeedback(req.feedback, true, 'success', {"payload" : model.payload}));
});

router.post("/vmw/me/card/update/data", (req, res) => {
    /**
     * This route handler expects a POST request with the following query parameters:
     * 
     * {
     *   // Required fields
     *   token: 
     * }
     *
     *  Example request:
     *  
     *
     */
    const model = getModelService(req);
    res.status(200).json(setFeedback(req.feedback, true, 'success', {"payload" : model.payload}));
});

export default router;