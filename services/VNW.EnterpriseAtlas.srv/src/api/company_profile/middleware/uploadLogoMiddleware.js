import setFeedback from "../../../services/setFeedback.js";
import uploadAzureStorage from "../../../services/uploadAzureStorage.js";
import initContainerCliAzure from "../../../services/initializeContainerClientAzure.js";
import {deleteRedisKey} from "../../../databases/redis-jack.js";

/**
 * Upload the logo to Azure Blob Storage
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const uploadLogoMiddleware = async (req, res, next) => {
    const containerClient = initContainerCliAzure("images");

    if (!req.files || req.files.length !== 1) {
        return res.status(400).json(setFeedback(req.feedback, false));
    }

    const file = req.files[0];
    if (!file) return next();


    const blobName = `${req.userID}_company_logo`;
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

export default uploadLogoMiddleware;