

/**
 * An initial order item
 */
export const orderItemTemplate = {
    id: '',
    itemName: '',
    itemImage: '',
    specification: '',
    quantity: '',
    unit: '',
    description: '',
    hashtag: [],
    providerCode: []
};

/**
 * An initial order
 */
export const initialOrder = {
    id: '',
    general: {
        orderName: '',
        orderCreatedAt: new Date().toISOString().split("T")[0],
        orderDueDate: '',
        orderAddress: '',
        orderRemark: ''
    },
    pricing: [
        /**
         * orderItemTemplate
         */
    ],
    filter: {
        priorityTime: true,
        priorityPrice: false,
        priorityQuality: false,
        targetCountry: '',
        allowedAnothers: true,
        minStars: 2,
    },
    fileAttachment: null,
    profile: {
        org: '',
        tax: ''
    }
};

export const ROFReducer = (state, action) => {
    switch (action.type) {
        case 'SET_ORDER_GENERAL':
            return {
                ...state,
                general: action.payload
            };
        case 'SET_ORDER_ITEM':
            return {
                ...state,
                pricing: action.payload
            };
        case 'SET_ORDER_FILTER':
            return {
                ...state,
                filter: action.payload
            };
        case 'SET_ORDER_FILE':
            return {
                ...state,
                fileAttachment: action.payload
            };
        case 'SET_ORDER_ID':
            return {
                ...state,
                id: action.payload
            };
        case 'SET_ORDER_PROFILE':
            return {
                ...state,
                id: action.payload.id,
                profile: action.payload.profile,
                general: {
                    ...state.general,
                    orderAddress: action.payload.address
                }
            };
        default:
            return state;
    }
}



