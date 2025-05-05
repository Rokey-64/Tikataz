import { Router } from "express";
import multer from "multer";
import { cluster } from '../../../databases/redis-jack.js';
import { nanoid } from "nanoid";
import { showMessage } from "../../../databases/fluentd-jack.js";
import setFeedback from "../../../services/setFeedback.js";
import getModelService from "../../../services/getModelService.js";
import { GENERATING_AURFQ_KEY } from "../../../services/generateRedisKeys.js";
import overLimmitRFQMiddleware from "../middlewares/overLimmitRFQMiddleware.js";
import requestRFQValidMiddleware from "../middlewares/requestRFQValidMiddleware.js";
import uploadFileMiddleware from "../middlewares/uploadFileMiddleware.js";
import prepareDataMiddleware from "../middlewares/prepareDataMiddleware.js";
import updateRFQMiddleware from "../middlewares/updateRFQMiddleware.js";
import checkIDMiddleware from "../middlewares/checkIDMiddleware.js";
import loadInitDataMiddleware from "../middlewares/loadInitDataMiddleware.js";
import findItemHistoryMiddleware from "../middlewares/findItemHistoryMiddleware.js";
import findHashtagMiddleware from "../middlewares/findHashtagMiddleware.js";
import getRecentlyAutoRFQMiddleware from "../middlewares/getRecentlyAutoRFQMiddleware.js";
import cancelQuotationMiddleware from "../middlewares/cancelQuotationMiddleware.js";
import orderDisplayInfoMiddleware from "../middlewares/orderDisplayInfoMiddleware.js";
import orderDisplayGetLinkMiddleware from "../middlewares/orderDisplayGetLinkMiddleware.js";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/init", overLimmitRFQMiddleware, async (req, res) => {
    /**
     * Generate a new key for the RFQ (Request for Quotation) process
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

    const userID = req.userID;
    const rfqID = nanoid(21);
    // const key = `${userID}-AURFQ-$${rfqID}`;
    const key = GENERATING_AURFQ_KEY(userID, rfqID);

    try {
        /**
         * Create a new key in Redis with a TTL of 1 hour
         */
        await cluster.set(key, rfqID, 'NX', 'EX', 60 * 60 * 1);
    }
    catch (err) {
        showMessage("error", "Error setting key in Redis", err);
        return res.status(400).json(setFeedback(req.feedback, false));
    }

    res.status(200).json(setFeedback(req.feedback, true, 'successfull', { id: rfqID }));
});

router.post("/",
    upload.any(),
    overLimmitRFQMiddleware,
    requestRFQValidMiddleware,
    uploadFileMiddleware,
    prepareDataMiddleware,
    updateRFQMiddleware,
    async (req, res) => {
        /**
         * Confirm the RFQ process
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
        const rfqID = model.payload.id;
        const userID = req.userID;

        // const key = `${userID}-RFQ-$${rfqID}`;
        const key = GENERATING_AURFQ_KEY(userID, rfqID);

        // Delete the key from Redis
        try {
            await cluster.del(key);
        }
        catch (err) {
            showMessage("error", "Error deleting key in Redis", err);
            return res.status(400).json(setFeedback(req.feedback, false));
        }

        res.status(200).json(setFeedback(req.feedback, true, 'successfull', {}));
    });

router.get("/verify", checkIDMiddleware, loadInitDataMiddleware, async (req, res) => {
    /**
     * This route is used to check if the RFQ ID is valid
     */
    const model = getModelService(req);

    res.status(200).json(setFeedback(req.feedback, true, 'successfull', { payload: model.payload }));
});

router.get("/items", findItemHistoryMiddleware, async (req, res) => {
    /**
     * This route is used to find the item history for the RFQ process
     */
    const model = getModelService(req);

    res.status(200).json(setFeedback(req.feedback, true, 'successfull', { payload: model.payload }));
});

router.get("/hashtags", findHashtagMiddleware, async (req, res) => {
    /**
     * This route is used to find the hashtag for the RFQ process
     */
    const model = getModelService(req);

    res.status(200).json(setFeedback(req.feedback, true, 'successfull', { payload: model.payload }));
});

router.get("/recent", getRecentlyAutoRFQMiddleware, async (req, res) => {
    /**
     * This route is used to get the recently auto RFQ process
     */
    const model = getModelService(req);

    res.status(200).json(setFeedback(req.feedback, true, 'successfull', { payload: model.payload }));
});

router.delete("/stop", cancelQuotationMiddleware, async (req, res) => {
    /**
     * This route is used to cancel the RFQ process
     */
    res.status(200).json(setFeedback(req.feedback, true, 'successfull', {}));
});

router.get("/details", async (req, res) => {
    orderDisplayInfoMiddleware,
    orderDisplayGetLinkMiddleware,
    async (req, res) => {
        /**
         * This route is used to get the order display information for the RFQ process
         */
        const model = getModelService(req);

        

        res.status(200).json(setFeedback(req.feedback, true, 'successfull', { payload: model.payload }));
    }
});

export default router;