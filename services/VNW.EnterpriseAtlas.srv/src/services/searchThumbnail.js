import thumbnailModel from '#@/models/mongoo/thumbnail.js';

/**
 * Find a thumbnail by its ID from the database.
 * @param {*} query 
 * @returns 
 */
const searchThumbnail = async (id) => {
    try {
        const result = await thumbnailModel.findOne({ id: id }).lean();

        if (result) {
            return result.buffer;
        }
    } catch (error) {
        console.error("Error searching thumbnail:", error);
    }
}

export default searchThumbnail;