import {StorageManagementClient  } from '@azure/arm-storage';
import { DefaultAzureCredential } from '@azure/identity';
import { BlobServiceClient, ContainerClient, BlobSASPermissions } from '@azure/storage-blob';
import express from 'express';

const AZURE_CONNECTION_STRING = process.env.AZURE_CONNECTION_STRING;
const router = express.Router();

router.get("/vmw/api/atlas/azzure/container", async (req, res) =>{ 
    /**
     * This route handler expects a GET request with the following query parameters:
     * 
     * {
     *   // Required fields
     *   token: <string> (Required) - The token to verify.
     * }
     *
     *  Example request:
     *  /otp/cnf?token=123456
     *
     */
    
    const storageClient = BlobServiceClient.fromConnectionString(AZURE_CONNECTION_STRING);
    const container = [];

    const ContainerClient = storageClient.getContainerClient("container");
    const blobs = ContainerClient.getBlobClient("blob");

    ContainerClient.findBlobsByTags()

    await blobs.uploadData("Hello, World!", {
        blobHTTPHeaders: {
            blobContentType: "text/plain",

        }
    });

    blobs.setTags({
        tagSet: {
            "key1": "value1",
            "key2": "value2"
        }
    });

    setFeedback(req.feedback, 'success', 'success', {"container" : container, "_id" : model._id});
    
    res.status(200).json(req.feedback);
})

export default router