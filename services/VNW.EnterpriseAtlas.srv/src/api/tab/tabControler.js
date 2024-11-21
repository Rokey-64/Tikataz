import express from 'express'
import {findTopTag} from './findTagMidleware.js'


const router = express.Router()

router.get("/tag/find", findTopTag(10), async (req, res, next) =>{ 
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
    result = req.result
    
    return result
})


router.get("/tag/default", async (req, res, next) =>{ 
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

    const token = req.query.token
    
    return token
})

export default router