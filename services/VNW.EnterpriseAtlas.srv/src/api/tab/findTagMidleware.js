import tagModel from './tagModel.js'
import mongoose from "mongoose";

export const findTopTag = (limit = 10) => async (req, res, next) =>{ 
    /**
     * This route handler expects a GET request with the following query parameters:
     * 
     * {
     *   // Required fields
     *   token: <string> (Required) - The token to verify.
     * }
     * 
     *  Example request:
     *  /otp/cnf?token=123456
     * 
     */
    const query = {_id:-1}
    const result = await tagModel.find().sort(query).limit(limit).exec();

    let tags = [];
    let length = result.length;
    
    for (let i = 0; i < result.length; i++) {
        tags.push(result[i].toJSON());
    }
    req.tags = tags;
    
    return next();
}