import { has } from "lodash";
import { useReducer } from "react";

/**
 * An initial order item
 */
export const orderItemTemplate = {
    id: '',
    itemName: '',
    itemImage: '',
    specification: '',
    quantity: 0,
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
        orderCreatedAt: '',
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
    fileAttachment: null
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
        default:
            return state;
    }
}



