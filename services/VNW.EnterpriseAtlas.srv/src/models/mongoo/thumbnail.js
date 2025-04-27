import mongoose from "mongoose";

const mongo_schema = new mongoose.Schema({
    id: {type: String, required: true},
    buffer: {type: Buffer},
    uid: {type: String, default: ""},
},{timestamps: true});

mongo_schema.index({id: 1}, {unique: true});
mongo_schema.index({uid: 1});

const thumbnailModel = mongoose.model("thumbnail", mongo_schema);
export default thumbnailModel