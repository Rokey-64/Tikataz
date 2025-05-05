// import { StorageManagementClient } from '@azure/arm-storage';
// import { DefaultAzureCredential } from '@azure/identity';
import { BlobServiceClient, ContainerClient, BlobSASPermissions } from '@azure/storage-blob';
import StorageService from './storageService.js';


/**
 * * Initialize the container client for Azure Storage
 * * @param {*} containerName - the name of the container
 * * @returns - the container client
 */
class AzureStorageService extends StorageService {
    constructor(containerName) {
        super();
        const storageClient = BlobServiceClient.fromConnectionString(process.env.AZURE_CONNECTION_STRING);
        this.containerClient = storageClient.getContainerClient(containerName);
    }

    async uploadFile(buffer, fileName, fileType, tags) {
        const blockBlobClient = this.containerClient.getBlockBlobClient(fileName);
        let result;

        try {
            result = await blockBlobClient.uploadData(buffer, {
                blobHTTPHeaders: {
                    blobContentType: fileType,
                }
            });

            if (tags) {
                await blockBlobClient.setTags(tags);
            }
        }
        catch (err) {
            throw err;
        }

        return result;
    }

    /**
     * Create a link to download the file or display image from Azure Storage
     * @param {string} fileName - the name of the file to download
     * @param {number} exp - the expiration time in minutes, default is 2 days
     * @returns 
     */
    async generateDownloadLink(fileName, exp = 60 * 24 * 2) {
        const blockBlobClient = this.containerClient.getBlockBlobClient(fileName);

        const expiryTime = new Date();
        expiryTime.setMinutes(expiryTime.getMinutes() + exp);

        try {
            const sasToken = await blockBlobClient.generateSasUrl({
                permissions: BlobSASPermissions.parse("r"),
                // startsOn: new Date(),
                expiresOn: expiryTime
            });
            return sasToken;
        }
        catch (err) {
            throw err;
        }
    }


    async deleteFile(fileName) {
        const blockBlobClient = this.containerClient.getBlockBlobClient(fileName);
        await blockBlobClient.deleteIfExists({ deleteSnapshots: "include" });
    }
}

export default AzureStorageService;