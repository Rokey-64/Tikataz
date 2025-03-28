import getModelService from "../../../services/getModelService.js";
import uploadAzureStorage from "../../../services/uploadAzureStorage.js";
import initContainerCliAzure from "../../../services/initializeContainerClientAzure.js";
import { showMessage } from "../../../databases/http_fluentd.js";
import { deleteRedisKey } from "../../../databases/redis-jack.js";

/**
 * a middleware that is used to cache files 
 */
const pushFileToAzure = async (req, res, next) => {
    const storageClient = initContainerCliAzure('images');
    const model = getModelService(req);

    for (const file of req.files) {
        if (file.fieldname && file.buffer) {
            /**
             * if the file is not an image, skip it
             */
            if (!file.mimetype.includes('image')) {
                showMessage('pushFileToAzure', 'The file is not an image');
                return res.status(400).json(setFeedback(req.feedback, false));
            }

            /**
             * Create the blob name which is also the key for the Redis cache
             */
            const blobName = `${model.id}-${file.fieldname}-${file.originalname}`;

            /**
             * Delete the old version of the file if it exists in the redis cache
             */
            try {
                await deleteRedisKey(blobName);
            }
            catch (err) {
                showMessage('pushFileToAzure', 'Error occurred while deleting the old version of the file', err);
            }

            /**
             * Upload the file to the azure storage
             */
            try {
                const tags = {
                    userID: req.userID,
                    type: file.fieldname,
                    kind: 'cards'
                }

                await uploadAzureStorage(file.buffer, file.mimetype, blobName, storageClient, tags);
            }
            catch (err) {
                showMessage('pushFileToAzure', 'Error occurred while uploading the file to azure storage', err);
                continue;
            }
        }
    }
    next();
};

export default pushFileToAzure;