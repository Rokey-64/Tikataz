import setFeedback from "../../../services/setFeedback.js";
import _AutoCardModel from "../models/atoCardModel.js";
import { showMessage } from "../../../databases/http_fluentd.js";
import getModelService from "../../../services/getModelService.js";
import mongoose from "mongoose";
import getSProfileService from "../services/getSProfileService.js";

/**
 * Get the supplier profile from the database and attach it to the request object.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const getSupplierProfileMiddleware = async (req, res, next) => {
    const model = getModelService(req);

    // user is the id of the user in the database
    const userID = model?.sid;

    // cardId is the id of the card in the database
    const cid = model?.cid;

    if (!cid) {
        showMessage("error", "Missing cid", null);
        return res.status(400).json(setFeedback(req.feedback, false, "Missing cid"));
    }

    const payload = {
        supplierName: "",
        supplierTaxcode: "",
        supplierAddress: "",
        supplierPhone: "",
        supplierEmail: ""
    };

    try {
        const result = await getSProfileService(userID, cid);

        if (result && result.length > 0) {
            const profile = result[0];
            payload.supplierName = profile.corp_name;
            payload.supplierTaxcode = profile.tax_code;
            payload.supplierAddress = profile.address;
            payload.supplierPhone = profile.phone_number;
            payload.supplierEmail = profile.email;
        }
    }
    catch (err) {
        showMessage("error", "Error getting suppliers", err);
        return res.status(400).json(setFeedback(req.feedback, false));
    }

    model.payload = payload;
    return next();
}

export default getSupplierProfileMiddleware;