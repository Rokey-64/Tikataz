import { Router } from "express";
import getModelService from "../../services/getModelService.js";
import setFeedback from "../../services/setFeedback.js";
import mysqlConn from '../../databases/mysql-jack.js';
import languagesModel from "../../models/mysql/languagesModel.js";
import { where } from "sequelize";


const router = Router();

router.get("/vmw/atlas/language/find", async (req, res) => {
    /**
     * This route handler expects ...
     * 
     * {
     *   // Required fields
     *   token: <string>
     * }
     *  
     * 
     * 
     * Example request:
     * /otp/cnf?t...
     *  
     * /
     * */
    const language = languagesModel(mysqlConn);
    const model = getModelService(req);

    /**
     * Get data from the database
     */
    try {
        const data = await language.findAll({
            where: {
                isSupported: true
            }
        });
        model.languages = data;
    } catch (error) {
        // ⛔ TODO: Log the error here
        return res.status(500).json(setFeedback(req.feedback, false));
    }
    
    res.status(200).json(setFeedback(req.feedback, true, 'success', {"languages" : model.languages}));
});

export default router;