import tagModel from '../../../models/mongoo/tagModel.js'
import mongoose from "mongoose";
import getModelService from "../../../services/getModelService.js";


export const findTopTag = (limit = 10) => async (req, res, next) =>{ 
    /**
     * This middleware expects a GET request with the following query parameters:
     * _id: <string> (optional) - The ID of the user.
     * limit: <number> (optional) - The maximum number of tags to return.
     */
    let tags = [];
    const model = getModelService(req);
    let result = null;

    if (model._id == null)

        /**
         * Get tags from database {"metadata.timestamp": {"$gt": timestamp}} 67359f7fd93217ebbf795a1e 6735a240d93217ebbf795a28
         * db.tags.find({ _id: ObjectId("674194a2075ecd7cae77bdf6") });
         */
        result = await tagModel.find().sort({_id:1}).limit(limit).exec();

    else
        result = await tagModel.find({_id: {$gt: new mongoose.Types.ObjectId(String(model._id))}}).sort({_id:1}).limit(limit).exec();

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