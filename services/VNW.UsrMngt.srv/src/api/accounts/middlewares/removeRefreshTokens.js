import { t } from 'i18next';
import {scanRedisKeys, deleteRedisKeys} from '#@/services/db-connection/redis-jack.js';
import { genRFKey, genLoginOTPKey } from '#@/services/redis-template-key/index.js';
import getModelService from '#@/services/getModelService.js';
import emitLog from "#@/services/fluentd-connection/fluentd-jack.js";
import setFeedback from "#@/services/setFeedback.js";

/**
 * This middleware is used to remove all refresh tokens when the user logs out of all devices.
 * 
 * 
 * @throws {Error} - If the scanRedisKeys or deleteRedisKeys fails
 * @throws {Error} - If the deleteRedisKeys fails
 */
const removeRefreshTokens = async (req, res, next) => {
    const model = getModelService(req);
    const userID = model?.user?.userID || model?.payload?.userID;

    if (userID) return next();

    // Generate the pattern for refreshing the keys
    const patterm = genRFKey(userID, '*');

    // Scan the Redis keys
    const keys = await scanRedisKeys(patterm).catch(error => {
        emitLog(level.ERROR, req.id, error.message, 'MiddleWare/removeRefreshTokens | scanRedisKeys', { userID });
        return res.status(500).json(
            setFeedback(
                req.feedback,
                false,
                'Cannot scan the Redis keys',
                {
                    prevID: req.id,
                    userNotification: t('server_error')
                }
            )
        );
    });

    // Delete the Redis keys
    await deleteRedisKeys(keys).catch(error => {
        emitLog(level.ERROR, req.id, error.message, 'MiddleWare/removeRefreshTokens | deleteRedisKeys', { userID });
        return res.status(500).json(
            setFeedback(
                req.feedback,
                false,
                'Cannot delete the Redis keys',
                {
                    prevID: req.id,
                    userNotification: t('server_error')
                }
            )
        );
    });

    next();
}

export default removeRefreshTokens;