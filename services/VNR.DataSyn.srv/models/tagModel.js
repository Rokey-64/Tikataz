import mongoose from "mongoose";

const mongo_schema = new mongoose.Schema({
    description: {
        description: {type: String, default: ""},
        intro: {type: [String], default: []},
    },
    company: {
        companyname: {type: String, default: ""},
        title: {type: String, default: ""}
    },
    prediction:{
        keywords: []
    }
})

const tagModel = mongoose.model("raw_cards", mongo_schema);
export default tagModel