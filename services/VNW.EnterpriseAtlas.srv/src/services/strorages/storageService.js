
class StorageService {
    /**
     * Allows you to upload a file to the storage service.
     * @param {*} buffer - The file buffer to upload.
     * @param {*} fileName - The name of the file to upload.
     */
    async uploadFile(buffer, fileName, fileType, tags) {
        throw new Error("Method not implemented.");
    }

    /**
     * Deletes a file from the storage service.
     * @param {*} fileName 
     */
    async deleteFile(fileName) {
        throw new Error("Method not implemented.");
    }

    /**
     * Creates a download link for the existed file.
     * @param {*} fileName 
     */
    async generateDownloadLink(fileName) {
        throw new Error("Method not implemented.");
    }
}

export default StorageService;