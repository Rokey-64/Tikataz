import setFeedback from "../../../services/setFeedback.js";
import getModelService from "../../../services/getModelService.js";
import searchBranchService from "../services/searchBranchService.js";
import { showMessage } from "../../../databases/http_fluentd.js";

/**
 * This middleware is used to search the branch of the company
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const BranchSeachingMiddleware = async (req, res, next) => {
    const model = getModelService(req);
    const branches = [];

    try {
        const result = await searchBranchService(req.userID);

        if (result[0].length === 0) {
            return req.status(200).json(setFeedback(model, 404));
        }

        /**
         * Create the branch template that suits the response
         */
        result.forEach((item) => {
            branches.push({
                id: item.id,
                name: item.name,
                taxcode: item.tax_code,
                date: item.register_date,
                address: item.address,
                phone: item.phone_number,
                email: item.email
            });
        });

    }
    catch (err) {
        showMessage("BranchSeachingMiddleware", err);
        return res.status(model.status).json(setFeedback(model, 500));
    }

    model.branches = branches;
    next();
};

export default BranchSeachingMiddleware;