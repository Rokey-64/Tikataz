// Initilize
import mongoose from "mongoose";

const social_schema = new mongoose.Schema({
    type: {type: String, enum: ["facebook", "zalo", "linkedin", "instagram", "youtube", "tiktok"], default: ""},
    link: {type: String, default: "", trim: true}
}, {_id: false});

const time_schema = new mongoose.Schema({
    start: {type: String, default: "08:00", trim: true},
    end: {type: String, default: "17:00", trim: true},
    active: {type: Boolean, default: true},
    index: {type: String, default: ""}
}, {_id: false});

const product_schema = new mongoose.Schema({
    id: {type: String, default: "", trim: true},
    name: {type: String, default: "", trim: true},
    position: {type: String, default: "", trim: true},
}, {_id: false});

const cert_schema = new mongoose.Schema({
    id: {type: String, default: "", trim: true},
    certype: {type: String, default: "", trim: true},
    certCode: {type: String, default: "", trim: true},
    certValidDate: {type: Date},
    certExpiredDate: {type: Date},
    certWeblink: {type: String, default: "", trim: true},
    certProvider: {type: String, default: "", trim: true},
}, {_id: false});

const cust_schema = new mongoose.Schema({
    id: {type: Number, default: 0},
    custName: {type: String, default: "", trim: true},
    custAddress: {type: String, default: "", trim: true}
}, {_id: false});

const card_schema = new mongoose.Schema({
    user_id: {type: String, default: "", trim: true},
    state: {type: String, enum: ["approved", "pending", "rejected"], default: "pending"},
    general:{
        logo: {type: String, default: "", trim: true},
        branchName: {type: String, default: "", trim: true},
        description: {type: String, default: "", trim: true},
        email: {type: String, default: "", trim: true},
        phone: {type: String, default: "", trim: true},
        fax: {type: String, default: "", trim: true},
        zalo: {type: String, default: "", trim: true},
        address:{
            type: [String], 
            default: [],
            set: values => values.map(v => v.trim()) 
        },
        website: {type: String, default: "", trim: true},
        workingTime: {
            type: [time_schema], 
            default: [
                { start: "08:00", end: "17:00", active: true, index: 0 },
                { start: "08:00", end: "17:00", active: true, index: 1 },
                { start: "08:00", end: "17:00", active: true, index: 2 },
                { start: "08:00", end: "17:00", active: true, index: 3 },
                { start: "08:00", end: "17:00", active: true, index: 4 },
                { start: "08:00", end: "17:00", active: true, index: 5 },
                { start: "", end: "", active: false, index: 6 }
            ]
        },
        social: {
            type: [social_schema],
            default: []
        },
        businessField: {type: String, default: ""},
        keywords: {type: String, default: ""},
    },
    products: {type: [product_schema], default: []},
    certificates: {type: [cert_schema], default: []},
    customers: {type: [cust_schema], default: []},
    category: {
        kindOfBusiness: {
            production: { value: {type: Boolean, default: false}},
            outsourcing: { value: {type: Boolean, default: false}},
            service: { value: {type: Boolean, default: false}},
            commerce: { value: {type: Boolean, default: false}},
        },
        transportation: {
            domestic: {
                value: {type: Boolean, default: true},
                support: { value: {type: Boolean, default: false}},
                byService: { value: {type: Boolean, default: false}},
                byBuyer: { value: {type: Boolean, default: false}},
            },
            international: {
                value: {type: Boolean, default: true},
                kind: {
                    air: { value: {type: Boolean, default: false}},
                    sea: { value: {type: Boolean, default: false}},
                    rail: { value: {type: Boolean, default: false}},
                    road: { value: {type: Boolean, default: false}},
                },
                incoterm: {
                    EXW: { value: {type: Boolean, default: false}},
                    FCA: { value: {type: Boolean, default: false}},
                    FAS: { value: {type: Boolean, default: false}},
                    FOB: { value: {type: Boolean, default: false}},
                    CFR: { value: {type: Boolean, default: false}},
                    CIF: { value: {type: Boolean, default: false}},
                    CPT: { value: {type: Boolean, default: false}},
                    DDP: { value: {type: Boolean, default: false}},
                    DAP: { value: {type: Boolean, default: false}},
                    DPU: { value: {type: Boolean, default: false}},
                    negotiation: { value: {type: Boolean, default: false}},
                }
            },
            time: {
                value: {type: Boolean, default: true},
                domestic: { value: {type: Number, default: 0}},
                international: { value: {type: Number, default: 0}},
            }
        },
        partner: {
            sightseeing: {
                value: {type: Boolean, default: true},
                thirdParty: { value: {type: Boolean, default: false}},
            },
            template: {
                value: {type: Boolean, default: true},
                cost: {
                    byCustomer: { value: {type: Boolean, default: false}},
                    byProvider: { value: {type: Boolean, default: false}},
                    negotiation: { value: {type: Boolean, default: false}},
                },
                time: { value: {type: Number, default: 0}},
            },
            certification: { value: {type: Boolean, default: false}},
            schedule: { value: {type: Boolean, default: false}},
            debt: {
                value: {type: Boolean, default: false},
                domestic: { value: {type: Boolean, default: false}},
                international: { value: {type: Boolean, default: false}},
            },
            failover: { value: {type: Boolean, default: false}},
        },
        storage: {
            value: {type: Boolean, default: true},
            kind: {
                cold: { value: {type: Boolean, default: false}},
                dry: { value: {type: Boolean, default: false}},
                material: { value: {type: Boolean, default: false}},
                product: { value: {type: Boolean, default: false}}
            },
            area: { value: {type: Number, default: 0, set: v => isNaN(v) ? 0 : v}},
            capacity: { value: {type: Number, default: 0, set: v => isNaN(v) ? 0 : v}},
            cost: {
                value: {type: Boolean, default: true},
                byCustomer: { value: {type: Boolean, default: false}},
                byProvider: { value: {type: Boolean, default: false}},
                negotiation: { value: {type: Boolean, default: false}},
            },
            time: { value: {type: String, default: ""}},
        },
        merge: { value: {type: Boolean, default: false}},
        promotion: {
            value: {type: Boolean, default: false},
            number: { value: {type: Boolean, default: false}},
            loyal: { value: {type: Boolean, default: false}},
            location: { 
                domestic: { value: {type: Boolean, default: false}},
                international: { value: {type: Boolean, default: false}}
             },
            time: { value: {type: String, default: ""}}
        },
    }
}, {timestamps: true});

card_schema.index({user_id: 1});
  
const cardModel = mongoose.models.cards || mongoose.model("cards", card_schema);
export default cardModel;