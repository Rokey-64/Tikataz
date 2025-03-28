import { Router } from "express";
import multer from "multer";
import getModelService from "../../../services/getModelService.js";
import setFeedback from "../../../services/setFeedback.js";
import loadingInitialDataMiddleware from "../middlewares/loadingInitialDataMiddleware.js";
import pushFileToAzure from "../middlewares/fileCachingMiddleware.js";
import accessLimitMiddleware from "../middlewares/accessLimitMiddleware.js";
import validDataCheckingMiddleware from "../middlewares/validDataCheckingMiddleware.js";
import createCardDataSessionMiddleware from "../middlewares/createCardDataSessionMiddleware.js";
import getSessionMiddleware from "../middlewares/getSessionMiddleware.js";
import updateCardDataMiddleware from "../middlewares/updateCardDataMiddleware.js";
import mongoUpdateCardMiddleware from "../middlewares/mongoUpdateCardMiddleware.js";
import getInlineCardsMiddleware from "../middlewares/getInlineCardsMiddleware.js";
import setInlineCardDefaultData from "../middlewares/setInlineCardDefaultData.js";
import getCardByIDMiddleware from "../middlewares/getCardByIDMiddleware.js";
import overLimmitCardMiddleware from "../middlewares/overLimmitCardMiddleware.js";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/vmw/me/card/check", overLimmitCardMiddleware, (req, res) => {
    /**
     * Check whether the number of cards is over the limit
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

    // Return the response
    res.status(200).json(setFeedback(req.feedback, true));
});

router.get("/vmw/me/card/init", getCardByIDMiddleware, loadingInitialDataMiddleware, (req, res) => {
    /**
     * Prepare the initial data for the card in edit mode
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
    res.status(200).json(setFeedback(req.feedback, true, 'success', { "payload": model.payload }));
});

router.post("/vmw/me/card/update/master", accessLimitMiddleware, 
    upload.any(), getSessionMiddleware, overLimmitCardMiddleware, updateCardDataMiddleware, mongoUpdateCardMiddleware, pushFileToAzure,
    (req, res) => {
        /**
         * Push image files to Azure Blob Storage and update the card data in the database
         * 
         * {
         *   // Required fields
         *   token: 
         * }
         *
         *  Example request:
         *  ⭕⭕❗❗ Note: Upload.any will reset the model ❌❌
         *
         */

        // Return the response
        const model = getModelService(req);
        res.status(200).json(setFeedback(req.feedback, true, 'success', { "payload": model.mapping, "id": model.id }));
    });

router.post("/vmw/me/card/update/slave", validDataCheckingMiddleware, accessLimitMiddleware, createCardDataSessionMiddleware, (req, res) => {
    /**
     * Push the data to the session
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
    res.status(200).json(setFeedback(req.feedback, true, 'success', { "id": model.payload.id }));
});

router.get("/vmw/me/card/inline/list", getInlineCardsMiddleware, setInlineCardDefaultData, (req, res) => {
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
    res.status(200).json(setFeedback(req.feedback, true, 'success', {payload: req.stardardCards}));
});

export default router;