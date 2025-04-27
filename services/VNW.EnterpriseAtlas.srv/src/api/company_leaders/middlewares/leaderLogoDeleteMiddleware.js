import { showMessage } from "../../../databases/http_fluentd.js";
import getModelService from "../../../services/getModelService.js";
// import initContainerCliAzure from "../../../services/initializeContainerClientAzure.js";
import createStorageService from "../../../services/strorages/createStorageService.js";
import setFeedback from "../../../services/setFeedback.js";
import { GENERATING_CARD_AVATAR_KEY } from "../../../services/generateRedisKeys.js";

/**
 * Delete leader logo middleware from Azure Blob Storage
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const leaderLogoDeleteMiddleware = async (req, res, next) => {
    const model = getModelService(req);
    // const containerClient = initContainerCliAzure("images");
    const storageService = createStorageService("images");
    // const blobName = `${model.id}_avatar`;
    const blobName = GENERATING_CARD_AVATAR_KEY(model.id);
    try{
        // await containerClient.deleteBlob(blobName, { deleteSnapshots: "include" });
        await storageService.deleteFile(blobName);
    }
    catch(err){
    }
    next();
}

export default leaderLogoDeleteMiddleware;