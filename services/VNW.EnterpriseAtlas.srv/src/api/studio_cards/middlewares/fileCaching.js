import getModelService from "#@/services/getModelService.js";
// import uploadAzureStorage from "../../../services/uploadAzureStorage.js";
// import initContainerCliAzure from "../../../services/initializeContainerClientAzure.js";
import createStorageService from "#@/services/strorages/createStorageService.js";
import { showMessage } from "#@/databases/http_fluentd.js";
import { deleteRedisKey } from "#@/databases/redis-jack.js";
import { GENERATING_CARD_BLOB_KEY } from "#@/services/generateRedisKeys.js";

/**
 * a middleware that is used to cache files 
 */
const pushFileToAzure = async (req, res, next) => {
    /**
     * Comment by LINH on 04-03-2025
     * Description: Use the storage service to upload the file to azure storage instead of the azure storage client directly.
     */
    // const storageClient = initContainerCliAzure('images');

    /**
     * Replace by the storage service
     */
    const storageService = createStorageService('images');

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
             * * Comment by LINH on 26-04-2025
             * * Check if the file is a logo, customers or products
             * * If it is not, skip it
             */
            if (['logo', 'customers', 'products'].includes(file.fieldname) === false) continue;

            /**
             * Create the blob name which is also the key for the Redis cache
             */
            // const blobName = `${model.id}-${file.fieldname}-${file.originalname}`;
            const blobName = GENERATING_CARD_BLOB_KEY(model.id, file.fieldname, file.originalname);

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

                /**
                 * Comment by LINH on 04-03-2025
                 * Description: Use the storage service to upload the file to azure storage instead of the azure storage client directly.
                 */
                // await uploadAzureStorage(file.buffer, file.mimetype, blobName, storageClient, tags);

                await storageService.uploadFile(file.buffer, blobName, file.mimetype, tags);
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