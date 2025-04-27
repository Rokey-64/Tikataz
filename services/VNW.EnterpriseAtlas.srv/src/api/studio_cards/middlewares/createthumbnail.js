import resizeImage from "#@/services/resizeImage.js";
import saveThumbnail from '../services/saveThumbnail.js';
import { GENERATING_CARD_BLOB_KEY } from "#@/services/generateRedisKeys.js";
import getModelService from "#@/services/getModelService.js";

/**
 * Create a thumbnail for the given image.
 */
const createThumbnail = async (req, res, next) => {
    const MAX_THUMBNAIL_SIZE = 64;
    const MAX_THUMBNAIL_REVOLUTIONS = 80;
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

            if (['logo', 'customers'].includes(file.fieldname) === false) continue;

            try {
                const thumbnailBuffer = await resizeImage(file.buffer, MAX_THUMBNAIL_SIZE, MAX_THUMBNAIL_REVOLUTIONS);
                if (thumbnailBuffer) {
                    const id = GENERATING_CARD_BLOB_KEY(model.id, file.fieldname, file.originalname);
                    await saveThumbnail(thumbnailBuffer, id, req.userID);
                }
            }
            catch (error) {
                process.env.NODE_ENV === 'development' && console.error("Error creating thumbnail:", error);
            }

        }

    }

    return next();

}

export default createThumbnail;