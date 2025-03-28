import setFeedback from '../../../services/setFeedback.js';
import {getStateAccessLimmit, setStateAccessLimmit} from '../validations/accessLimmit.js';
import {showMessage} from '../../../databases/http_fluentd.js';
import getModelService from '../../../services/getModelService.js';
/**
 * If the user has reached the limit of the number of files that can be uploaded, this middleware will prevent the user from uploading more files.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const accessLimitMiddleware = async (req, res, next) => {
    const model = getModelService(req);
    const userID = req.userID;
    const payload = model.payload;

    /**
     * Not checking for the first time the user uploads a file
     */
    if(!payload?.id)
        return next();

    const LIMMIT_UPLOAD_CARD = 100;
    const accessLimmit = await getStateAccessLimmit(userID, payload.id);
    if (accessLimmit >= LIMMIT_UPLOAD_CARD) {
        showMessage('accessLimmit', accessLimmit);
        return res.status(400).json(setFeedback(req.feedback, false, 'error', { message: 'You have reached the limit of the number of files that can be uploaded' }));
    }
    else{
        await setStateAccessLimmit(userID, payload.id, accessLimmit+1);
    }
    next();
};

export default accessLimitMiddleware;