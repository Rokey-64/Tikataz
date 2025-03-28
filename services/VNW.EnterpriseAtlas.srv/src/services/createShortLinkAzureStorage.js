import {StorageManagementClient  } from '@azure/arm-storage';
import { DefaultAzureCredential } from '@azure/identity';
import { BlobServiceClient, ContainerClient, BlobSASPermissions, StorageSharedKeyCredential} from '@azure/storage-blob';
import express from 'express';

/**
 * Create a short link for the image stored in Azure Storage
 * @param {*} blobName 
 * @param {*} containerClient 
 * @returns 
 */
const createShortLinkAzureStorage = async (blobName, containerClient) => {

    const blobs = containerClient.getBlockBlobClient(blobName);

    const expiryTime = new Date();
    expiryTime.setMinutes(expiryTime.getMinutes() + 30);

    try{
        const sasToken = await blobs.generateSasUrl({
            permissions: BlobSASPermissions.parse("r"),
            // startsOn: new Date(),
            expiresOn: expiryTime
        });
        return sasToken;
    }
    catch(err){
        throw err;
    }
};

export default createShortLinkAzureStorage
