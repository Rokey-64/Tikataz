import { Router } from "express";
import { verifyJWT } from "../services/token-auths";
import { genRFKey } from "../services/redis-template-key";
import getModelService from "../services/getModelService";
import { deleteRedisKey } from "../services/db-connection/redis-jack";
import emitLog from "../services/fluentd-connection/fluentd-jack";
import setFeedback from "../services/setFeedback";

const router = Router();
const UKEY = 'LOGOUT';

router.post('/logout', async (req, res) => {

    const model = getModelService(req);
    const accessToken = req.cookies.accessToken;

    const payload = await verifyJWT(accessToken).catch(err => {
        return res.status(401).json(
            setFeedback(
                req.feedback,
                false,
                err.message,
                {
                    prevID: req.id,
                    userNotification: req.t('token_valid')
                }
            )
        );
    });

    const key = genRFKey(payload.userID, model.deviceID);
    
    /**
     * Delete the refresh token from the redis database
     * 
     * Arguments:
     * 1. The key (key) - The key of the refresh token.
     * 
     * Return:
     * * 200 - The refresh token is deleted successfully.
     * * 500 - Internal server error.
     */
    await deleteRedisKey(key).catch(err => {
        emitLog('ERROR', req.id, err.message, 'src/controllers/logoutController.js | deleteRedisKey', { payload });
        return res.status(500).json(
            setFeedback(
                req.feedback,
                false,
                err.message,
                {
                    prevID: req.id,
                    userNotification: req.t('server_error')
                }
            )
        );
    });

    res.status(200).json(
        setFeedback(
            req.feedback,
            true,
            'Logout successfully',
            {
                prevID: req.id,
                userNotification: req.t('logout_success')
            }
        )
    );
});