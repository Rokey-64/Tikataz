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

const router = express.Router()

router.get("/vmw/api/atlas/find", loadBasicCardInfo, generatePictureUrl, generatePayload, async (req, res) => {
    /**
     * This route handler expects a GET request with the following query parameters:
     * 
     * {
     *   // Required fields
     *   token: <string> (Required) - The token to verify.
     * }
     * 
     */

    const model = getModelService(req);
    res.status(200).json(setFeedback(req.feedback, true, 'success', {payload: model.payload.base}));
})

router.get("/vmw/api/atlas/thumbnails/:id", async (req, res) => {
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

router.get("/vmw/api/atlas/next/product/image", generateURLByIndex, async (req, res) => {
    /**
     * This route handler expects a GET request with the following query parameters:
     * 
     * {
     *   // Required fields
     *   token: <string> (Required) - The token to verify.
     * }
     * 
     *  Example request:
     *  /otp/cnf?token=123456
     * 
     */
    const model = getModelService(req);

    res.status(200).json(setFeedback(req.feedback, true, 'success', { "url": model.prodURL }));
})

router.get("/vmw/api/atlas/tag/find", findTopTag(), async (req, res) => {
    /**
     * This route handler expects a GET request with the following query parameters:
     * 
     * {
     *   // Required fields
     *   token: <string> (Required) - The token to verify.
     * }
     *
     *  Example request:
     *  /otp/cnf?token=123456
     *
     */
    const model = getModelService(req);

    setFeedback(req.feedback, true, 'success', { "tags": model.tags, "_id": model._id });

    res.status(200).json(req.feedback);
})



router.get("/vmw/api/atlas/tag/findby", findTagByMajor(), async (req, res, next) => {
    /**
     * This route handler expects a GET request with the following query parameters:
     * 
     * {
     *   // Required fields
     *   token: <string> (Required) - The token to verify.
     * }
     * 
     *  Example request:
     *  /otp/cnf?token=123456
     * 
     */
    const model = getModelService(req);

    setFeedback(req.feedback, true, 'success', { "tags": model.tags, "_id": model._id });

    res.status(200).json(req.feedback);
})


export default router