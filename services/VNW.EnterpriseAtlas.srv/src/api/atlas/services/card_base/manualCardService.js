import StandardCardService from './standardCardService.js';
import CommonCardTemplate from './templateService.js';
import cardModel from '../../../../models/mongoo/cardModel.js';
import mongoose from 'mongoose';

class ManualCardService extends StandardCardService {
    constructor() {
        super();
    }
    getProfile() {
        this.queryString['general.website'] = 1;
        this.queryString['general.description'] = 1;
        this.queryString['general.branchName'] = 1;
        return this;
    }

    getPartners() {
        this.queryString['customers'] = 1;
        return this;
    }

    getLocation() {
        this.queryString['general.address'] = 1;
        return this;
    }

    getProducts() {
        this.queryString['products'] = 1;
        return this;
    }

    getLogo() {
        this.queryString['general.logo'] = 1;
        return this;
    }

    getCerts() {
        this.queryString['certificates'] = 1;
        return this;
    }

    getWorkingTime() {
        this.queryString['general.workingTime'] = 1;
        return this;
    }

    async run(cid, limit, predicts, searchCIDs) {
        const cardTemplate = new CommonCardTemplate();
        this.createFilter(cid, predicts, searchCIDs);

        const result = await cardModel.find(this.queryCondition, this.queryString).limit(limit).lean();
        if (!result || result.length === 0) return null;

        /**
         * convert products to the format of card
         * @param {*} products 
         * @returns 
         */
        const convertProducts = (products) => {
            return products.map((product) => {
                return {
                    id: product.id,
                    name: product.name || "",
                    link: "",
                    key: ""
                };
            });
        }

        for (let i = 0; i < result.length; i++) {
            const card = result[i];

            /**
             * Convert products to the format of card
             * @param {*} products - array of products
             */
            const products = convertProducts(card.products);

            const address = super.handleAddress(card.general.address);


            const payload = cardTemplate.createNewTemplate()
                .setCID(card._id.toString())
                .setUID(card.user_id)
                .setCardType('manual')
                .setWebsite(card.general.website || "")
                .setDescription(card.general.description || "")
                .setBranchName(card.general.branchName || "")
                .setAddress(address)
                .setProducts(products)
                .setCustomers(card.customers || [])
                .setCerts(card.certificates || [])
                .setLogo(card.general.logo || "")
                .setWorkingTime(card.general.workingTime || [])
                .getPayload();

            this.payload.push(payload);
        }
        return this.payload;
    }
}

export default ManualCardService;