import express from "express";
import { errCode, setFailedFeedback } from '../../errors.js';
import createAccount from "../resositories/createAccount.js";
import { getRedisKey, deleteRedisKey } from "../services/db-connection/redis-jack.js";
import emitLog, { level, showMessage } from '../services/fluentd-connection/fluentd-jack.js';
import getModelService from "../services/getModelService.js";
import verifyRegisterToken from "../middlewares/verifyRegisterToken.js";
import setFeedback from "../services/setFeedback.js";

const router = express.Router();
const UKEY = 'REGISTER_CONFIRM';

/**
 * prepareUser - prepare the user data for the next
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const getUser = async (req, res, next) => {
    const model = getModelService(req);
    let hashPassword;

    /**
     * Get payload from the model
     * 
     * Fields:
     * * payload - The token payload.
     * * payload.userID - The user ID.
     * * payload.email - The email of the user.
     * * payload.username - The username of the
     */
    const payload = model.payload;

    /**
     * Get the password that was saved before from Redis
     * 
     * Fields:
     * * email - The email of the user.
     */
    try {
        hashPassword = await getRedisKey(payload.email);
        if (!hashPassword) res.status(400).json(
            setFeedback(
                req.feedback,
                false,
                'The password is not found from token',
                {
                    prevID: req.id,
                    userNotification: req.t('token_invalid')
                }
            )
        );
    } catch (err) {
        emitLog(level.ERROR, req.id, err.message, 'src/controllers/signup/confirm | getRedisKey', { prevReqID: req.query.id });
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

    /**
     * create a user data according to the decoded token
     * 
     * Fields:
     * * user - The user data.
     * * user.userID - The user ID.
     * * user.email - The email of the user.
     * * user.userName - The userName of the user.
     * * user.hashPassword - The hashed password of the user.
     */
    model.user = {
        userID: payload.userID,
        email: payload.email,
        userName: payload.userName,
        hashPassword: hashPassword
    }

    next();
}

/**
 * insert the user to the database
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const insertUsertoDB = async (req, res, next) => {
    const model = getModelService(req);

    /**
     * Create an account for the user
     * 
     * Fields:
     * * userID - The user ID.
     * * email - The email of the user.
     * * username - The userName of the user.
     * * hashPassword - The hashed password of the user.
     */
    const { userID, email, userName, hashPassword } = model.user;

    try {
        await createAccount(userID, userName, hashPassword, email);
    } catch (error) {
        emitLog(level.ERROR, req.id, error.message, 'src/controllers/signup/confirm | userAccount.create', { prevReqID: req.query.id });
        return res.status(500).json(
            setFeedback(
                req.feedback,
                false,
                error.message,
                {
                    prevID: req.id,
                    userNotification: req.t('server_error')
                }
            )
        );
    }


    next();
}


router.get('/signup/confirm', verifyRegisterToken, getUser, insertUsertoDB, async (req, res) => {
    /**
     * This route handler expects a POST request body with the following structure:
     * 
     * {
     *   // Required fields
     *   id: <string> (Required) - The previous request ID.
     *   lang: <string> (Required) - The language of the user.
     *   token: <string> (Required) - The token to verify.
     * }
     * 
     * Example request body:
     * 
     * {
     *   "id": "123456",
     *   "lang": 'vi',
     *   "token": "djuewu9wejkkjdfsa.wmejhsdjfawejhkwejjkdsdfjawejrwjajdjfsafehjsdf.sdfjkehrkjwahisuhdfjshdfjhaweuhuisdhf"
     * }
     */

    const model = getModelService(req);
    const email = model?.user?.email;
    await deleteRedisKey(email).catch((err) => {
        emitLog(level.ERROR, req.id, err.message, 'src/controllers/signup/confirm | deleteRedisKey', { prevReqID: req.query.id });
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

    return res.status(200).json(
        req.t('account_created')
    );
});
export default router