import getModelService from "../../../services/getModelService.js";
import uploadAzureStorage from "../../../services/uploadAzureStorage.js";
import initContainerCliAzure from "../../../services/initializeContainerClientAzure.js";
import createStorageService from "../../../services/strorages/createStorageService.js";
import { showMessage } from "../../../databases/http_fluentd.js";
import feedbackModel from "../../../models/mysql/feedbackModel.js";
import fileFormatValidation from "../../../services/fileFormatValidation.js";
import { GENERATING_AURFQ_ATTACHMENT_KEY, GENERATING_AURFQ_ITEM_KEY} from "../../../services/generateRedisKeys.js";


const uploadFileMiddleware = async (req, res, next) => {
    // const fileStorageClient = initContainerCliAzure('files');
    // const imgStorageClient = initContainerCliAzure('images');

    const fileStorageClient = createStorageService('files');
    const imgStorageClient = createStorageService('images');

    const model = getModelService(req);
    const order = model.convertOrder;
    const MAX_FILE_UPLOAD = model.MAX_FILE_UPLOAD;
    
    let fileCount = 0;

    /**
     * * * Check file upload limit
     */
    if(req.files.length > MAX_FILE_UPLOAD) {
        showMessage('error', 'File upload limit exceeded', req.files.length);
        return res.status(400).json(feedbackModel(req.feedback, false));
    }

    /**
     * * Check before upload file
     */
    for (const file of req.files) {
        if (!file.buffer) {
            continue;
        }

        // Check file format
        const isValidFormat = await fileFormatValidation(file);
        if (!isValidFormat) {
            showMessage('error', 'Invalid file format', file.originalname);
            return res.status(400).json(feedbackModel(req.feedback, false));
        }

        if (file.fieldname === 'file') {
            fileCount++;

            // Only one file is allowed
            if (fileCount > 1) {
                showMessage('error', 'Only one file is allowed', file.originalname);
                return res.status(400).json(feedbackModel(req.feedback, false));
            }

            // Check file size
            if (file.size > 1 * 1024 * 1024) {
                showMessage('error', 'File size exceeds the limit of 1MB', file.originalname);
                return res.status(400).json(feedbackModel(req.feedback, false));
            }
            
        }
        if (file.fieldname == 'item') {
           // Check image size
            if (file.size > 0.3 * 1024 * 1024) {
                showMessage('error', 'Image size exceeds the limit of 5MB', file.originalname);
                return res.status(400).json(feedbackModel(req.feedback, false));
            }

        }
    }

    /**
     * * Upload file to Azure Blob Storage
     */
    for (const file of req.files) {
        if (!file.buffer) {
            continue;
        }

        // Create tags for blob storage
        const tags = {
            userID: req.userID,
            type: file.fieldname,
            kind: 'rfq'
        }

        try {
            if (file.fieldname === 'file') {
                // const blobName = `${order.id}-attachment`;
                const blobName = GENERATING_AURFQ_ATTACHMENT_KEY(order.id);
                // await uploadAzureStorage(file.buffer, file.mimetype, blobName, fileStorageClient, tags);
                await fileStorageClient.uploadFile(file.buffer, blobName, file.mimetype, tags);

                // Set the model's attachment property to true
                model.attachment = true;
            }
            if (file.fieldname == 'item') {
                // const blobName = `${order.id}-item-${file.originalname}`;
                const blobName = GENERATING_AURFQ_ITEM_KEY(order.id, file.originalname);
                // await uploadAzureStorage(file.buffer, file.mimetype, blobName, imgStorageClient, tags);
                await imgStorageClient.uploadFile(file.buffer, blobName, file.mimetype, tags);
            }
        }
        catch (err) {
            showMessage('error', 'Error uploading file to Azure Blob Storage', err);
            return res.status(400).json(feedbackModel(req.feedback, false));
        }
    }




    return next();
}

export default uploadFileMiddleware;