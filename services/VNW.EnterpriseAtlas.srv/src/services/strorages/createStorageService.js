import AzureStorageService from "./azureStorageService.js";

/**
 * Dispatches the storage service based on the storage type. [abstract factory pattern]
 * @description This function creates a storage service based on the storage type.
 * @param {*} containerName 
 * @returns 
 */
const createStorageService = (containerName) => {
    switch (process.env.STORAGE_TYPE) {
        case 'azure':
            return new AzureStorageService(containerName);
        default:
            throw new Error(`Storage type ${storageType} not supported`);
    }
}

export default createStorageService;