

/**
 * Upload a block blob to Azure Storage
 * Reference from https://learn.microsoft.com/en-us/javascript/api/overview/azure/storage-blob-readme?view=azure-node-latest
 * @param {*} imageBuffer 
 * @param {*} blobName 
 * @param {*} containerName 
 * 
 * @returns
 */
const uploadAzureStorage = async (imageBuffer, imageType, blobName, containerClient, tags) =>{
    // const storageClient = BlobServiceClient.fromConnectionString(AZURE_CONNECTION_STRING);
    // const ContainerClient = storageClient.getContainerClient(containerName);
    const blobs = containerClient.getBlockBlobClient(blobName);
    let result;

    // Upload data to the blob
    try{
        result = await blobs.uploadData(imageBuffer, {
            blobHTTPHeaders: {
                blobContentType: imageType,
            }
        });
    }
    catch(err){
        throw err;
    }

    // Set  tags to the blob
    try{
        if(tags){
            await blobs.setTags(tags);
        }
    }
    catch(err){
        /** Do nothing or send a log here*/
        throw err;
    }

    await blobs.setMetadata({
        userID: tags.userID,
        type: tags.type
    });

    return result;
};

export default uploadAzureStorage