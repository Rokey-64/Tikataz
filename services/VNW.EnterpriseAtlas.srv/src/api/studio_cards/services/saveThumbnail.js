import mongoose from "mongoose";
import thumbnailModel from "#@/models/mongoo/thumbnail.js";

/**
 * Save the thumbnail to the database.
 * @param {*} thumbnailBuffer - The thumbnail image buffer.
 * @param {*} id - The ID of the model to which the thumbnail belongs. id is also regarded as the blob name.
 * @param {*} uid - The user ID of the model to which the thumbnail belongs.
 */
const saveThumbnail = async (thumbnailBuffer, id, uid) => {
    try {
        const result = await thumbnailModel.findOneAndUpdate(
            { id: id },
            { 
                buffer: thumbnailBuffer,
                uid: uid
            },
            { 
                upsert: true, new: true, rawResult: true
            }
        );

    } catch (error) {
        console.error("Error saving thumbnail:", error);
    }
}

export default saveThumbnail;