import tagModel from './tagModel.js'
import mongoose from "mongoose";
import sessionService from "../../services/session_control.js";
import getModelService from "../../services/getModelService.js";


export const findTagByMajor = (limit = 10) => async (req, res, next) =>{ 
    /**
     * This middleware expects a GET request with the following query parameters:
     * _id: <string> (optional) - The ID of the user.
     * limit: <number> (optional) - The maximum number of tags to return.
     */
    const LIMIT_PREDIECT_VALUE = 30;
    let tags = [];
    const model = getModelService(req);
    let result = null;
    if (!model.major) return next();
    const key = `prediction.weighted_predict.${model.major.toUpperCase()}`;

    if (model._id == null) {//{[key]:{$gt:20}}
        result = await tagModel.find({[key]:{$gt:LIMIT_PREDIECT_VALUE}}).sort({_id:1}).limit(limit).exec();
    }
    else
        result = await tagModel.find({_id: {$gt: new mongoose.Types.ObjectId(model._id)} , [key]: {$gt: LIMIT_PREDIECT_VALUE}}).sort({_id:1}).limit(limit).exec();

    if (result == null) return next();

    for (let i = 0; i < result.length; i++) {
        if (!model._id  || model._id < result[i]._id.toString())
            model._id = result[i]._id.toString();

        /**
         * push tags to array
         */
        tags.push(result[i].toJSON());
    }
    model.tags = tags;

    return next();
}