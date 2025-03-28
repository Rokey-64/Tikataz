

/**
 * Get the total size of blobs in a container by tag
 * @param {string} tagKey
 * @param {string} tagValue
 * @param {ContainerClient} containerClient
 * @returns {number} totalSize
 */
async function getTotalSizeByTag(query, containerClient) {
    let totalSize = 0;

    // Query blobs by tag
    const blobs = containerClient.findBlobsByTags(query);

    for await (const blob of blobs) {
        const blobClient = containerClient.getBlobClient(blob.name);
        const properties = await blobClient.getProperties();
        totalSize += properties.contentLength; // contentLength là kích thước blob
    }

    return totalSize;
};

export default getTotalSizeByTag;
