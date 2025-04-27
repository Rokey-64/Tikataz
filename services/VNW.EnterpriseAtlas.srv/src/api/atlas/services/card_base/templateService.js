import _ from 'lodash';

class CommonCardTemplate {
    static ctype = {
        manual: 'manual',
        auto: 'auto'
    }


    static badgesTemplate = {
        type: '',
        validDate: '',
        expiredDate: '',
        name: ''
    }



    constructor() {

        this.templates = {
            atlasKind: 'card',
            cid : '',
            uid: '',
            ctype: '',
            data: {
                general: {
                    logo: '',
                    branchName: '',
                    description: '',
                    address: '',
                    website: '',
                    workingTime: [],
                    businessField: ''
                },
                products: [],
                customers: [],
                certificates: [],
                
            },
            badges: [
                /**
                 * <CommonCardTemplate.badgesTemplate>
                 */
            ],
            rating: 0,
            reactions: {
                like: 0,
                love: 0
            }
        };

        this.payload = {};
    }

    /**
     * Create a new template for the card
     * @returns 
     */
    createNewTemplate() {
        this.payload = _.cloneDeep(this.templates);
        return this;
    }

    setCID(cid) {
        this.payload.cid = cid;
        return this;
    }

    setUID(uid) {
        this.payload.uid = uid;
        return this;
    }

    setCardType(ctype) {
        this.payload.ctype = ctype;
        return this;
    }

    setWebsite(website) {
        this.payload.data.general.website = website;
        return this;
    }

    setDescription(description) {
        this.payload.data.general.description = description;
        return this;
    }

    setBranchName(branchName) {
        this.payload.data.general.branchName = branchName;
        return this;
    }

    setAddress(address) {
        this.payload.data.general.address = address;
        return this;
    }

    setProducts(products) {
        this.payload.data.products = products;
        return this;
    }

    setCustomers(customers) {
        this.payload.data.customers = customers;
        return this;
    }

    setCerts(certificates) {
        this.payload.data.certificates = certificates;
        return this;
    }

    setLogo(logo) {
        this.payload.data.general.logo = logo;
        return this;
    }

    setWorkingTime(workingTime) {
        this.payload.data.general.workingTime = workingTime;
        return this;
    }

    getPayload() {
        return this.payload;
    }
}

export default CommonCardTemplate;