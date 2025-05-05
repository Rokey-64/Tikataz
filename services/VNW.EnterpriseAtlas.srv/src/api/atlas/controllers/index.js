import express from 'express'
import setFeedback from '#@/services/setFeedback.js'
import getModelService from '#@/services/getModelService.js'
import searchThumbnail from '#@/services/searchThumbnail.js';
import { findTopTag } from '../middlewares/findTag.js'
import { findTagByMajor } from '../middlewares/findTagByMajor.js'
import loadBasicCardInfo from '../middlewares/loadBasicCardInfo.js'
import generatePictureUrl from '../middlewares/generatePictureUrl.js'
import generatePayload from '../middlewares/generatePayload.js'
import generateURLByIndex from '../middlewares/generateURLByIndex.js'
import generateProdURLs from '../middlewares/generateProdURLs.js'
import repareOrgzProfile from '../middlewares/prepareOrgzProfile.js'
import prepareOrgzPolicy from '../middlewares/prepareOrgzPolicy.js'

const router = express.Router()

router.get("/general", loadBasicCardInfo, generatePictureUrl, generatePayload, async (req, res) => {
    /**
     * This route handler expects a GET request with the following query parameters:
     * 
     * {
     *   // Required fields
     *   
     * }
     *  
     */

    const model = getModelService(req);
    res.status(200).json(setFeedback(req.feedback, true, 'success', {payload: model.payload.base}));
})

router.get("/profile", repareOrgzProfile, async (req, res) => {
    /**
     * get the organization profile for the card
     * 
     * {
     *   // Required fields
     *   
     * }
     * 
     */

    const model = getModelService(req);
    res.status(200).json(setFeedback(req.feedback, true, 'success', {payload: model.payload}));
})

router.get("/policy", prepareOrgzPolicy, async (req, res) => {
    /**
     * get the policy for the card
     * 
     * {
     *   // Required fields
     *   
     * }
     * 
     */

    const model = getModelService(req);
    res.status(200).json(setFeedback(req.feedback, true, 'success', {payload: model.payload}));
})

router.get("/thumbnails/:id", async (req, res) => {
    const id =  req.params.id;
    if (!id) {
        return res.status(400).json(setFeedback(req.feedback, false));
    }

    try {
        const buffer = await searchThumbnail(id);
        if (!buffer) {
            return res.status(404).json(setFeedback(req.feedback, false));
        }

        const realBuffer = Buffer.isBuffer(buffer) ? buffer : Buffer.from(buffer.buffer);

        res.setHeader('Content-Type', 'image/webp');
        res.status(200);
        res.end(realBuffer);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json(setFeedback(req.feedback, false));
    }
});

router.get("/products/:cid/:id", generateURLByIndex, async (req, res) => {
    /**
     * This route get a product url from Azure storage or Redis by product ID
     * 
     * {
     *   // Required fields
     *   
     * }
     * 
     *  Example request:
     *  
     * 
     */
    const model = getModelService(req);

    res.status(200).json(setFeedback(req.feedback, true, 'success', { "url": model.prodURL }));
})

router.post("/products", generateProdURLs, async (req, res) => {
    /**
     * This route returns a a list of URLs for the product images from Azure storage or Redis.
     * {
     *   // Required fields
     *   
     * }
     * 
     *  Example request:
     *  
     * 
     */
    const model = getModelService(req);

    res.status(200).json(setFeedback(req.feedback, true, 'success', { "payload": model.payload }));
})


export default router