import express from 'express'
import {findTopTag} from './findTagMidleware.js'
import setFeedback from '../../services/setFeedback.js'
import getModelService from '../../services/getModelService.js'
import {findTagByMajor} from './findTagByMajorMidleware.js'

const router = express.Router()

router.get("/vmw/api/atlas/tag/find", findTopTag(), async (req, res) =>{ 
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

    setFeedback(req.feedback, true, 'success', {"tags" : model.tags, "_id" : model._id});
    
    res.status(200).json(req.feedback);
})


router.get("/vmw/api/atlas/tag/findby", findTagByMajor(), async (req, res, next) =>{ 
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

    setFeedback(req.feedback, true, 'success', {"tags" : model.tags, "_id" : model._id});
    
    res.status(200).json(req.feedback);
})


export default router