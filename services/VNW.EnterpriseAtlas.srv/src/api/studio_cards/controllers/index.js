import { Router } from "express";
import multer from "multer";
import getModelService from "#@/services/getModelService.js";
import setFeedback from "#@/services/setFeedback.js";
import loadingInitialData from "../middlewares/loadingInitialData.js";
import pushFileToAzure from "../middlewares/fileCaching.js";
import accessLimit from "../middlewares/accessLimit.js";
import validDataChecking from "../middlewares/validDataChecking.js";
import createCardDataSession from "../middlewares/createCardDataSession.js";
import getSession from "../middlewares/getSession.js";
import updateCardData from "../middlewares/updateCardDatae.js";
import mongoUpdateCard from "../middlewares/mongoUpdateCard.js";
import getInlineCards from "../middlewares/getInlineCards.js";
import setInlineCardDefaultData from "../middlewares/setInlineCardDefaultData.js";
import getCardByID from "../middlewares/getCardByID.js";
import overLimmitCard from "../middlewares/overLimmitCard.js";
import createThumbnail from "../middlewares/createthumbnail.js";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/verify", overLimmitCard, (req, res) => {
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

router.get("/init", getCardByID, loadingInitialData, (req, res) => {
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

router.post("/master", accessLimit, 
    upload.any(), getSession, overLimmitCard, updateCardData, mongoUpdateCard, createThumbnail, pushFileToAzure,
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

router.post("/slave", validDataChecking, accessLimit, createCardDataSession, (req, res) => {
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

router.get("/inline", getInlineCards, setInlineCardDefaultData, (req, res) => {
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