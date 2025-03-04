import mysqlConn from '../../databases/mysql-jack.js';
import timezoneModel from '../../models/timezoneModel.js';
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
      const feedback = setFeedback(req.feedback, false, error.message, {});
      return res.status(500).json(feedback);
    }

    next();
  };
  
  export default LoadDataMiddleware;