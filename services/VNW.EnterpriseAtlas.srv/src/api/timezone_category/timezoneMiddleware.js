import mysqlConn from '../../databases/mysql-jack.js';
import timezoneModel from '../../models/mysql/timezoneModel.js';
import setFeedback from '../../services/setFeedback.js';
import getModelService from '../../services/getModelService.js';

/**
 * This middleware loads a list of timezones from the database
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const LoadDataMiddleware = async (req, res, next) => {
    const model = getModelService(req);
    const createModel = timezoneModel(mysqlConn);
    try {
      
      const data = await createModel.findAll();
      model.timezone = data;
      
    } catch (error) {
      // ⛔ TODO: Add a logger for the error
      return res.status(500).json(setFeedback(req.feedback, false));
    }

    next();
  };
  
  export default LoadDataMiddleware;