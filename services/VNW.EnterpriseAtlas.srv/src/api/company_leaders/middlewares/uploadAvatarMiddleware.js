import setFeedback from "../../../services/setFeedback.js";
import uploadAzureStorage from "../../../services/uploadAzureStorage.js";
import initContainerCliAzure from "../../../services/initializeContainerClientAzure.js";
import {deleteRedisKey} from "../../../databases/redis-jack.js";
import getModelService from "../../../services/getModelService.js";

/**
 * Upload the logo to Azure Blob Storage
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const uploadAvatarMiddleware = async (req, res, next) => {
    const model = getModelService(req);
    const containerClient = initContainerCliAzure("images");


    if (!req.files || req.files.length !== 1) {
        return next();
    }

    const file = req.files[0];
    if (!file) return next();

    const blobName = `${model.data.id}_avatar`;
    try {
        // /imageBuffer, imageType, blobName, containerClient, tags
        const uploadRes = await uploadAzureStorage(file.buffer, file.mimetype ,blobName, containerClient, {userID: req.userID});

        if (!uploadRes) {
            return res.status(500).json(setFeedback(req.feedback, false));
        }

        // Delete old logo from Redis
        await deleteRedisKey(blobName);
    }
    catch (err) {
        return res.status(500).json(setFeedback(req.feedback, false));
    }

    return next();
};

export default uploadAvatarMiddleware;