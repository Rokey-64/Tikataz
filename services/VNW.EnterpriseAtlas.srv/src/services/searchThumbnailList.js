import thumbnailModel from '#@/models/mongoo/thumbnail.js';

/**
 * Find a thumbnail by IDs from the database.
 * @param {*} query 
 * @returns 
 */
const searchThumbnailList = async (ids) => {
    try {
        const result = await thumbnailModel.find({ id: {$in: ids} }).lean();

        if (result) {
            return result;
        }
    } catch (error) {
        console.error("Error searching thumbnail:", error);
    }
}

export default searchThumbnailList;