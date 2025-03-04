import mongoose from "mongoose";

const mongo_schema = new mongoose.Schema({
    header: {
        language: {type: String, default: "vi"},
        domain: String,
        time: {
            "2":{start: String, finish: String},
            "3":{start: String, finish: String},
            "4":{start: String, finish: String},
            "5":{start: String, finish: String},
            "6":{start: String, finish: String},
            "7":{start: String, finish: String},    
            "8":{start: String, finish: String},
        },
        logo: {type: [String], default: []},
    },
    contact:{
        email: {type: [String], default: []},
        address: {type: [String], default: []},
        phone: {type: [String], default: []},
        social: {type: [String], default: []},
    },
    description: {
        description: {type: String, default: ""},
        intro: {type: [String], default: []},
    },
    company: {
        companyname: {type: String, default: ""},
        title: {type: String, default: ""},
        taxcode: {type: [String], default: []},
        gov_link: {type: String, default: ""}
    },
    productions: {type: [String], default: []},
    metadata:{
        timestamp: {type: String, default: ""},
    }
})

const tagModel = mongoose.model("cards", mongo_schema);
export default tagModel