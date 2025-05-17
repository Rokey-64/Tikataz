import { Router } from "express";
import setFeedback from "../../../services/setFeedback.js";
import { showMessage } from "../../../databases/http_fluentd.js";
import getCurrencyMiddleware from "../middlewares/getCurrencyMiddleware.js";
import supplierPricingMiddleware from "../middlewares/supplierPricingMiddleware.js";
import getSupplierOrdersMiddleware from "../middlewares/getSupplierOrdersMiddleware.js";
import getModelService from "../../../services/getModelService.js";
import updateProfileMiddleware from "../middlewares/updateProfileMiddleware.js";
import getSupplierProfileMiddleware from "../middlewares/getSupplierProfileMiddleware.js";
import linkValidationMiddleware from "../middlewares/linkValidationMiddleware.js";
import countSupplierAccessMiddleware from "../middlewares/countSupplierAccessMiddleware.js";

const router = Router();

router.get("/currency", linkValidationMiddleware, getCurrencyMiddleware, async (req, res) => {
    /**
     * Get a list of currencies from the database and attach it to the request object.
     * * @param {*} req
     * * @param {*} res
     * * @param {*} next
     */
    const model = getModelService(req);
    return res.status(200).json(setFeedback(req.feedback, true, "success", { payload: model.payload }));
});

router.get("/orders", linkValidationMiddleware, countSupplierAccessMiddleware, getSupplierOrdersMiddleware, async (req, res) => {
    /**
     * Get a list of RFQ items that suppliers will price
     * * @param {*} req
     * * @param {*} res
     * * @param {*} next
     */
    const model = getModelService(req);
    return res.status(200).json(setFeedback(req.feedback, true, "success", { payload: model.payload }));
});

router.put("/pricing", linkValidationMiddleware, supplierPricingMiddleware, async (req, res) => {
    /**
     * Get a list of suppliers from the database and attach it to the request object.
     * * @param {*} req
     * * @param {*} res
     * * @param {*} next 
     */

    showMessage("⛔⛔ Remove redis vmw/rfq/supliers/pricing");
    const model = getModelService(req);
    return res.status(200).json(setFeedback(req.feedback, true, "success", { payload: model.payload }));
});

router.put("/profile", linkValidationMiddleware, updateProfileMiddleware, async (req, res) => {
    /**
     * Get a list of suppliers from the database and attach it to the request object.
     * * @param {*} req
     * * @param {*} res
     * * @param {*} next 
     */
    // const model = getModelService(req);
    return res.status(200).json(setFeedback(req.feedback, true, "success", {}));
});

router.get("/profile", linkValidationMiddleware, getSupplierProfileMiddleware, async (req, res) => {
    /**
     * Get supplier profile from the database and attach it to the request object.
     * * @param {*} req
     * * @param {*} res
     * * @param {*} next 
     */
    const model = getModelService(req);
    return res.status(200).json(setFeedback(req.feedback, true, "success", { payload: model.payload }));
});

export default router;
