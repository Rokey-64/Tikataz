import getModelService from "../../../services/getModelService.js";
import setFeedback from "../../../services/setFeedback.js";
import mysqlConn from "../../../databases/mysql-jack.js";
import { QueryTypes } from "sequelize";

import { nanoid } from "nanoid";

/**
 * Check valid data before processing
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const checkDataMiddleware = async (req, res, next) => {
    const model = getModelService(req);
    const state = model.state;
    let data = {};
    try{
        data = JSON.parse(model.data);
    }
    catch(err){
        return res.status(400).json(setFeedback(req.feedback, false));
    }

    // check if the required fields are missing
    if (!data?.name
        || !data?.position
        || !data?.id) {
        return res.status(400).json(setFeedback(req.feedback, false));
    };

    // Check if the state is valid
    if(state !== "add" && state !== "edit"){
        return res.status(400).json(setFeedback(req.feedback, false));
    }

    // Generate ID or Update ID
    if(state === "add") data.id = nanoid();

    model.data = data;

    return next();
}

export default checkDataMiddleware;