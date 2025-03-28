import { createSlice } from "@reduxjs/toolkit";
import selectChangedFields from "../services/selectChangedField";
import _ from "lodash";

const initialState = {
    /**
     * Card ID
     */
    id: "",

    /**
     * To check if the card was created in edit or create mode instead of rerendering mode
     */
    state: "",

    general: {
        logo: "",
        branchName: "",
        description: "",
        phone: "",
        email: "",
        fax: "",
        zalo: "",
        address: [],
        website: "",
        workingTime: [
            { start: "08:00", end: "17:00", active: true, index: 0 },
            { start: "08:00", end: "17:00", active: true, index: 1 },
            { start: "08:00", end: "17:00", active: true, index: 2 },
            { start: "08:00", end: "17:00", active: true, index: 3 },
            { start: "08:00", end: "17:00", active: true, index: 4 },
            { start: "08:00", end: "17:00", active: true, index: 5 },
            { start: "", end: "", active: false, index: 6 }
        ],
        social: [
            /**{type, link} */
        ],
        businessField: "",
        keywords: "",
    },

    products: [/** {name, image, id, position} */],
    certificates: [/** {certype, certCode, certProvider, certValidDate, certExpiredDate, certWeblink, id} */],
    customers: [/** {custName, custLogo, custAddress, id} */],

    category: {
        // Loại hình kinh doanh
        kindOfBusiness: {
            production: { value: false },
            outsourcing: { value: false },
            service: { value: false },
            commerce: { value: false },
        },
        // Vận chuyển
        transportation: {
            domestic: {
                value: true,
                support: { value: false },
                byService: { value: false },
                byBuyer: { value: false },
            },
            international: {
                value: true,
                kind: {
                    air: { value: false },
                    sea: { value: false },
                    rail: { value: false },
                    road: { value: false },
                },
                incoterm: {
                    EXW: { value: false },
                    FCA: { value: false },
                    FAS: { value: false },
                    FOB: { value: false },
                    CFR: { value: false },
                    CIF: { value: false },
                    CPT: { value: false },
                    DDP: { value: false },
                    DAP: { value: false },
                    DPU: { value: false },
                    negotiation: { value: false },
                }
            },
            time: {
                value: true,
                domestic: { value: 0 },
                international: { value: 0 },
            }
        },
        // Đối tác
        partner: {
            sightseeing: {
                value: true,
                thirdParty: { value: false },
            },
            template: {
                value: true,
                cost: {
                    byCustomer: { value: false },
                    byProvider: { value: false },
                    negotiation: { value: false },
                },
                time: { value: 0 },
            },
            certification: { value: false },
            schedule: { value: false },
            debt: {
                value: false,
                domestic: { value: false },
                international: { value: false },
            },
            failover: { value: false },
        },
        // Kho bãi
        storage: {
            value: true,
            kind: {
                cold: { value: false },
                dry: { value: false },
                material: { value: false },
                product: { value: false }
            },
            area: { value: 0 },
            capacity: { value: 0 },
            cost: {
                value: true,
                byCustomer: { value: false },
                byProvider: { value: false },
                negotiation: { value: false },
            },
            time: { value: 0 },
        },
        // Ghép hàng
        merge: { value: false },
        // Khuyến mãi cơ bản
        promotion: {
            value: false,
            number: { value: false },
            loyal: { value: false },
            location: {
                domestic: { value: false },
                international: { value: false }
            },
            time: { value: false }
        },
    },
    /**
     * Contains the history of the image uploaded to the server
     */
    history: [
        /** imgUrl */
    ],

    /**
     * changedTarget is used to check if the data has been changed
     */
    changedTarget: {
        general: {},
        products: false,
        certificates: false,
        customers: false,
        category: {},
    }
};

const slice = createSlice({
    name: 'cards',
    initialState: _.cloneDeep(initialState),


    reducers: {
        setGeneral: (state, action) => {
            selectChangedFields(_.cloneDeep(state.general), action.payload, state.changedTarget, "general");
            state.general = action.payload;
        },

        setProducts: (state, action) => {
            selectChangedFields(state.products, action.payload, state.changedTarget, "products");
            state.products = action.payload;
        },
        setCerts: (state, action) => {
            selectChangedFields(state.certificates, action.payload, state.changedTarget, "certificates");
            state.certificates = action.payload;
        },
        setCustomers: (state, action) => {
            selectChangedFields(state.customers, action.payload, state.changedTarget, "customers");
            state.customers = action.payload;
        },
        setCategory: (state, action) => {
            selectChangedFields(state.category, action.payload, state.changedTarget, "category");
            state.category = action.payload;
        },
        setHistory: (state, action) => {
            state.history = action.payload;
        },
        setID: (state, action) => {
            state.id = action.payload;
        },
        setChangedTarget: (state, action) => {
            state.changedTarget = action.payload;
        },
        setDefault: (state, action) => {
            /**
             * If Card does not exists, set changedTarget to true
             */
            if (!action.payload?.id) {
                const newState = _.cloneDeep(state);
                selectChangedFields(newState.general, action.payload.general, newState.changedTarget, "general");

                newState.general = action.payload.general;
                return newState;
            }
            return { ...state, ...action.payload };
        },

        resetDefault: (state) => {
            return _.cloneDeep(initialState);
        }
    }
});

export const { setGeneral, setProducts, setCerts, setCustomers, setCategory, setHistory, setID, setChangedTarget, setDefault, resetDefault} = slice.actions;
export {initialState};
export default slice.reducer;