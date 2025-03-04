import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'cards',
    initialState: {
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

        products: {
            items: [
                /** {name, path, image, id, position} */
            ],
            certs: [
                /** {certype, certCode, certProvider, certValidDate, certExpiredDate, certWeblink, id} */
            ]
        },

        customers: {
            manual: [/** {custName, custLogo, custAddress, id} */],
            auto: [/** {custName, custLogo, custAddress, id} */]
        },

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
                    type: {
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
                type: {
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
        }
    },
    reducers: {
        setGeneral: (state, action) => {
            state.general = action.payload;
        },
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        setCustomers: (state, action) => {
            state.customers = action.payload;
        },
        setCategory: (state, action) => {
            state.category = action.payload;
        }
    }
});

export const { setGeneral, setProducts, setCustomers, setCategory } = slice.actions;
export default slice.reducer;