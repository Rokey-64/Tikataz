import StandardCardService from './standardCardService.js';
import tagModel from '#@/models/mongoo/tagModel.js';
import CommonCardTemplate from './templateService.js';
import _, { } from 'lodash';
import mongoose from 'mongoose';

class AutomationCardService extends StandardCardService {
    constructor() {
        super();
    }

    getProfile() {
        this.queryString['header.domain'] = 1;
        this.queryString['description.intro'] = 1;
        this.queryString['company.title'] = 1;
        return this;
    }

    getPartners() {
        return this;
    }


    getLocation() {
        this.queryString['contact.address'] = 1;
        return this;
    }

    getProducts() {
        this.queryString['productions'] = 1;
        return this;
    }

    getLogo() {
        this.queryString['header.logo'] = 1;
        return this;
    }

    getCerts() {
        return this;
    }

    getWorkingTime() {
        this.queryString['header.time'] = 1;
        return this;
    }

    async run(cid, limit) {
        const cardTemplate = new CommonCardTemplate();
        const queryCondition = {};
        if (cid) {
            queryCondition._id = { $gt: new mongoose.Types.ObjectId(String(cid)) };
        }
        const result = await tagModel.find(queryCondition, this.queryString).lean().limit(limit).exec();
        if (result == null) return null;
        if (result.length === 0) return null;

        /**
         * Convert working time to the format of card
         * @param {*} workingTime 
         * @returns 
         */
        const convertWorkingTime = (workingTime) => {
            return [
                { start: workingTime[2].start || '', end: workingTime[2].finish || '', active: workingTime[2].start ? true : false, index: 0 },
                { start: workingTime[3].start || '', end: workingTime[3].finish || '', active: workingTime[3].start ? true : false, index: 1 },
                { start: workingTime[4].start || '', end: workingTime[4].finish || '', active: workingTime[4].start ? true : false, index: 2 },
                { start: workingTime[8].start || '', end: workingTime[8].finish || '', active: workingTime[8].start ? true : false, index: 3 },
                { start: workingTime[6].start || '', end: workingTime[6].finish || '', active: workingTime[6].start ? true : false, index: 4 },
                { start: workingTime[7].start || '', end: workingTime[7].finish || '', active: workingTime[7].start ? true : false, index: 5 },
                { start: workingTime[8].start || '', end: workingTime[8].finish || '', active: workingTime[8].start ? true : false, index: 6 }
            ];
        }

        /**
         * convert products to the format of card
         * @param {*} products 
         * @returns 
         */
        const convertProducts = (products) => {
            return products.map((product, index) => {
                return {
                    id: index,
                    name: '',
                    link: product || "",
                    key: ""
                };
            });
        }

        

        for (let i = 0; i < result.length; i++) {
            const card = result[i];
            const products = convertProducts(card.productions);
            const workingTime = convertWorkingTime(card.header.time);
            const address = super.handleAddress(card.contact.address);

            const payload = cardTemplate.createNewTemplate()
                .setCID(card._id.toString())
                .setUID(card.user_id || "")
                .setCardType('auto')
                .setWebsite(card.header.domain || "")
                .setDescription(card.description.intro[0] || "")
                .setBranchName(card.company.title || "")
                .setProducts(products)
                .setAddress(address)
                .setCustomers([])
                .setCerts([])
                .setLogo(card.header.logo[0] || "")
                .setWorkingTime(workingTime)
                .getPayload();

            this.payload.push(payload);
        }
        return this.payload;
    }
}

export default AutomationCardService;