import express from "express";
import verifyConfirmToken from "../middlewares/verifyConfirmToken.js";
import setFeedback from "#@/services/setFeedback.js";

const router = express.Router();
const UKEY = 'CONFIRM_TOKEN';

router.get('/', verifyConfirmToken(''), async (req, res) => {
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
    return res.status(200).json(
        setFeedback(
            req.feedback,
            true,
            'The token is verified',
            {
                prevID: req.id,
                userNotification: req.t('token_verified')
            }
        )
    );
});

export default router;
