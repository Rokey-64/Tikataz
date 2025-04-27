import mongoose from "mongoose";

export const mongo_schema = new mongoose.Schema({
    header: {
        language: {type: String, default: "vi", trim: true},
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
        keywords: {type: [String], default: []},
        logo: {type: [String], default: []},
    },
    contact:{
        address: {type: [String], default: []},
        email: {type: [String], default: []},
        phone: {type: [String], default: []},
        social: {type: [String], default: []},
    },
    description: {
        description: {type: String, default: ""},
        intro: {type: [String], default: []},
        certificate: {type: [String], default: []},
    },
    company: {
        companyname: {type: String, default: ""},
        title: {type: String, default: ""},
        taxcode: {type: [String], default: []},
        gov_link: {type: String, default: ""}
    },
    productions: {type: [String], default: []},
    prediction:{
        group_predict: {type: [String], default: []},
        weighted_predict: { type: Map, of: Number, default: {} },
        keywords: {type: [String], default: []},
    },
    metadata:{
        timestamp: {type: String, default: ""},
    },
    /**
     * 1. Chưa xác nhận - false
     * 2. Đã xác nhận - true
     */
    hasChecked: {type: Boolean, default: false},
    hasPassed: {type: Boolean, default: false},
    isOkPredict: {type: Boolean, default: false}
},
{
    collection: "raw_cards",
}
)

const _AutoCardModel = mongoose.model("autoCard", mongo_schema);
export default _AutoCardModel