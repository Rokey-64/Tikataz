import setFeedback from "../../../services/setFeedback.js";
// import uploadAzureStorage from "../../../services/uploadAzureStorage.js";
// import initContainerCliAzure from "../../../services/initializeContainerClientAzure.js";
import createStorageService from "../../../services/strorages/createStorageService.js";
import {deleteRedisKey} from "../../../databases/redis-jack.js";
import {GENERATING_COMPANY_LOGO_KEY} from "../../../services/generateRedisKeys.js";

/**
 * Upload the logo to Azure Blob Storage
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const uploadLogoMiddleware = async (req, res, next) => {
    // const containerClient = initContainerCliAzure("images");
    const storageService = createStorageService("images");
    if (!req.files || req.files.length !== 1) {
        return res.status(400).json(setFeedback(req.feedback, false));
    }

    const file = req.files[0];
    if (!file) return next();


    // const blobName = `${req.userID}_company_logo`;
    const blobName = GENERATING_COMPANY_LOGO_KEY(req.userID);
    try {
        // /imageBuffer, imageType, blobName, containerClient, tags
        // const uploadRes = await uploadAzureStorage(file.buffer, file.mimetype ,blobName, containerClient, {userID: req.userID});

        const result = await storageService.uploadFile(file.buffer, blobName, file.mimetype, { userID: req.userID });

        if (!result) {
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