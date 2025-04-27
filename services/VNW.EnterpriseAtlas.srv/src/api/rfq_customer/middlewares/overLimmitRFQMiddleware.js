import getModelService from "../../../services/getModelService.js";
import setFeedback from "../../../services/setFeedback.js";
import mysqlConn from "../../../databases/mysql-jack.js";
import { QueryTypes } from "sequelize";

/**
 * Check if the user has reached the limit for RFQ requests
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const overLimmitRFQMiddleware = async (req, res, next) => {
    const MAX_FILE_UPLOAD = 11;
    const model = getModelService(req);

    model.MAX_FILE_UPLOAD = MAX_FILE_UPLOAD;
    
    /**
     * * Check if the user has reached the limit for RFQ requests
     * * if the user is a VIP user, the limit is 10 requests per day
     * *  if the user is not a VIP user, the limit is 5 requests per day
     */
    console.log("💥💥 overLimmitRFQMiddleware is not ready yet");

    next();
}

export default overLimmitRFQMiddleware;