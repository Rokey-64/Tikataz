import getModelService from "../../../services/getModelService.js";
import setFeedback from "../../../services/setFeedback.js";
import mysqlConn from "../../../databases/mysql-jack.js";
import { QueryTypes } from "sequelize";
import sessionService from "../../../services/session_control.js";

/**
 * a middleware that is used to cache files 
 */
const FileCachingMiddleware = async (req, res, next) => {
    if (req.files.length >= 20) { // ❌ req.files.array.length ❌
        return res.status(400).json(setFeedback(req.feedback, false, 'error', 'Too many files uploaded'));
    }

    req.files.forEach(file => { 
        if (file.fieldname && file.buffer) {
            console.log(file.fieldname, file.originalname);
            // sessionService.setUserSession(req.session, file.fieldname, file.buffer);
        }
    });

    next();
};

export default FileCachingMiddleware;