import mysqlConn from '../../databases/mysql-jack.js';
import nationModel from '../../models/mysql/nationModel.js';
import setFeedback from '../../services/setFeedback.js';
import getModelService from '../../services/getModelService.js';

/**
 * This middleware loads a list of nations from the database
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const LoadDataMiddleware = async (req, res, next) => {
  const model = getModelService(req);
  const createModel = nationModel(mysqlConn);
  try {
    
    const data = await createModel.findAll();
    model.nation = data;
    next();
  } catch (error) {
    // ⛔ TODO: Log the error here
    return res.status(500).json(setFeedback(req.feedback, false));
  }
};

export default LoadDataMiddleware;