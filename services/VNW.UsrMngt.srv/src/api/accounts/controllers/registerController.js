import express from "express"
import { setRedisKey } from "#@/services/db-connection/redis-jack.js"
import { hashPassword } from '#@/services/password-hashing/index.js'
import emitLog, { level, showMessage } from '#@/services/fluentd-connection/fluentd-jack.js'
import setFeedback from "#@/services/setFeedback.js"
import verifyUserRegister from "../middlewares/verifyUserRegister.js"
import sendConfirmLink from "../middlewares/sendConfirmLink.js"

const router = express.Router();
const UKEY = 'REGISTER';

router.post('/', verifyUserRegister, sendConfirmLink, async (req, res) => {
    /**
     * This route handler expects a POST request body with the following structure:
     * 
     * {
     *   // Required fields
     *   id: <string> (Required) - The previous request ID.
     *   lang: <string> (Required) - The language of the user.
     *   did: <string> (Required) - The device ID of the user device.
     *   userName: <string> (Required) - The user login name of the user account.
     *   password: <string> (Required) - The password of the user.
     *   password: <string> (Required) - The password of the user.
     *   confirmPassword: <string> (Required) - The confirm password of the user.
     *   email: <string> (Required) - The email of the user.
     * }
     * 
     * Example request body:
     * 
     * {
     *   "id": "123456",
     *   "lang": 'vi',
     *   "did": "123456",
     *   "userName": "Hoang Nguyen",
     *   "password": "password123"
     *   "confirmPassword": "password123"
     *   "email": "helo"
     * }
     */


    const model = req.body;
    const metadata = { prevReqID: model.id, mail: model.email };
    const hpw = await hashPassword(model.password);

    // Store the hashed password in Redis
    try {
        await setRedisKey(model.email, hpw, 60 * 60)
    } catch (err) {
        emitLog(level.ERROR, req.id, err.message, 'signup/register | setRedisKey', metadata);
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
    }

    return res.status(200).json(
        setFeedback(
            req.feedback,
            true,
            'Link sent to confirm',
            {
                prevID: req.id,
                userNotification: req.t('link_sent_to_confirm')
            }
        )
    );
});


export default router