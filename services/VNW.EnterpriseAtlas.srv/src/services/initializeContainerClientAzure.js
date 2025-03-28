import {StorageManagementClient  } from '@azure/arm-storage';
import { DefaultAzureCredential } from '@azure/identity';
import { BlobServiceClient, ContainerClient, BlobSASPermissions } from '@azure/storage-blob';


const AZURE_CONNECTION_STRING = process.env.AZURE_CONNECTION_STRING;

/**
 * Initialize the container client for Azure Storage
 * @param {*} containerName - the name of the container
 * @returns - the container client
 */
const initContainerCliAzure = (containerName) => {
    const storageClient = BlobServiceClient.fromConnectionString(AZURE_CONNECTION_STRING);
    const containerClient = storageClient.getContainerClient(containerName);
    containerClient.deleteBlob("test_blob");
    return containerClient;
};

export default initContainerCliAzure;