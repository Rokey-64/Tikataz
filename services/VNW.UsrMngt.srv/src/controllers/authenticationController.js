import { Router } from "express";
import verifyRefreshToken from "../middlewares/verifyRefreshtoken.js";
import verifyAccessToken from "../middlewares/verifyAccessToken.js";
import createAccessToken from "../middlewares/createAccessToken.js";
import setFeedback from "../services/setFeedback.js";

const router = Router();
const UKEY = 'AUTHENTICATION';

router.get('/token/reissue', verifyRefreshToken, verifyAccessToken, createAccessToken, (req, res) => {

    /**
    * Set the access token to the cookies
    * 
    * Fields:
    * * model.user.accessToken - The access
    */
    res.cookie('accessToken', req.model.user.accessToken, { httpOnly: true, secure: true, sameSite: 'none' });

    res.status(200).json(
        setFeedback(
            req.feedback, 
            true,
            'Token reissued',
            { 
                prevID: req.id, 
                userNotification: req.t('token_refreshed')
            }
        )
    );
});