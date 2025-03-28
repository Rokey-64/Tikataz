import { showMessage } from "../../../databases/http_fluentd.js";
import getModelService from "../../../services/getModelService.js";
import initContainerCliAzure from "../../../services/initializeContainerClientAzure.js";
import setFeedback from "../../../services/setFeedback.js";

/**
 * Delete leader logo middleware from Azure Blob Storage
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const leaderLogoDeleteMiddleware = async (req, res, next) => {
    const model = getModelService(req);
    const containerClient = initContainerCliAzure("images");
    const blobName = `${model.id}_avatar`;
    try{
        await containerClient.deleteBlob(blobName, { deleteSnapshots: "include" });
    }
    catch(err){
    }
    next();
}

export default leaderLogoDeleteMiddleware;