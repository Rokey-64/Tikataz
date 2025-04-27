

class TagSchema {
    /**
     * This class is used to create a new tag schema
     * @returns
     * @constructor
     */
    constructor() {
        this.newTag = {
                _id: {type: String, default: ""},
                header: {
                    language: {type: String, default: ""},
                    domain: {type: String, default: ""},
                    logo: {type: String, default: ""}
                },
                contact:{
                    email: {type: [String], default: []},
                    address: {type: [String], default: []},
                    phone: {type: [String], default: []},
                    social: {type: [String], default: []},
                },
                description: {type: String, default: ""},
                company: {
                    companyname: {type: String, default: ""},
                    title: {type: String, default: ""}
                },
                productions: {type: [String], default: []}
            }
    }
}

class StatusSchema {
    /**
     * This class is used to create a new tag schema
     * @returns
     * @constructor
     */
    constructor() {
        this.newStatus = {
                _id: {type: String, default: ""},
                status: {type: String, default: "online"},
                time: {type: String, default: ""},
            }
    }
}

/**
 * Create a new tag
 * @param {*} tag 
 * @returns 
 */
const CreateTag = (tag) => {
    const newTag = (new TagSchema()).newTag

    newTag._id = tag._id
    
    newTag.header.language = tag.header.language
    newTag.header.domain = tag.header.domain

    /** */
    newTag.header.logo = !tag.header.logo ? "" : tag.header.logo[0]
    newTag.contact.email = tag.contact.email
    newTag.contact.address = tag.contact.address
    newTag.contact.phone = tag.contact.phone
    newTag.contact.social = tag.contact.social

    /** */
    newTag.description = tag.description.description ? tag.description.description : (tag.description.intro ? tag.description.intro[0] : "")
    newTag.company.companyname = tag.company.companyname || "None"
    newTag.company.title = tag.company.title || "None"

    /** */
    newTag.productions = tag.productions

    return newTag
}

/**
 * Create a new status
 * @param {*} tag 
 * @returns 
 */
const CreateStatus = (tag) => {
    const newStatus = (new StatusSchema()).newStatus

    newStatus._id = tag._id

    if (!tag.header.time) {
        newStatus.status = "offline"
        return newStatus
    }

    newStatus.time = tag.header.time

    newStatus.status = StatusUpdate(tag.header.time)

    return newStatus
}

/**
 * Nomoralize the tags from the defaultTags loaded via a API call and use them in the product component
 * @param {*} defaultTags 
 */
export default function TagRender (defaultTags)  {
    const tags = [];
    const status = []

    defaultTags.map((tag) => {
        const newTag = CreateTag(tag)

        const newStatus = CreateStatus(tag)

        tags.push(newTag)
        status.push(newStatus)
    })

    return { tags, status };
}

/**
 * Render the tags from the defaultTags loaded after a period of time
 * @param {*} defaultTags 
 */
export const TagRerennder = (statuses) => {
    const newStatus = {...statuses}
    const status = StatusUpdate(statuses.time)
    newStatus.status = status
    
    return newStatus
}

/**
 * Calculate the status of the customer, if the working time is within the range of the current time then the customer is online else offline
 * @param {*} time 
 * @returns 
 */
const StatusUpdate = (time) => {
    const today = new Date();
    const dayIndex = today.getDay() === 0 ? 8 : today.getDay() + 1;
    const rangeWorking = time[dayIndex.toString()];
    const timeNow = `${today.getHours().toString().padStart(2, "0")}${today.getMinutes().toString().padStart(2, "0")}`;
    let status = "online"
    if (rangeWorking) {
        const start = rangeWorking.start;
        const end = rangeWorking.finish;
        if (timeNow < (start || "0000") || timeNow > (end || "0000") ) {
            status = "offline"
        } 
    }

    return status
}

