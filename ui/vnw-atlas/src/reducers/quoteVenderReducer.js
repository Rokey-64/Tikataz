

export const initialState = {
    quoteData: null,
    loading: true,
    error: null,
    expired: false,
    isLoggedIn: false,
    userEmail: '',
    prices: [
        /**
         * {id, price, currency, state}
         * 
         * note: state enum ('processing','complete','skipped')
         * example:
         * {id: 1, price: 1000, currency: 'VND', totalAmount: 100000}
         */
    ],
    notes: '',
    suitabilityRating: 0,
    additionalInfo: {
        deliveryTime: '',
        paymentTerms: '',
        warranty: '',
        remark: '',
        evaluate: ''
    },
    statistics:{
        sum: '',
        win: '',
        rate: ''
    },
    listCurrency: [],
};

export const quoteVenderReducer = (state, action) => {
    switch (action.type) {
        case 'SET_QUOTE_DATA':
            return {
                ...state,
                quoteData: action.payload,
                loading: false
            };
        case 'SET_LOADING':
            return {
                ...state,
                loading: action.payload
            };
        case 'SET_ERROR':
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        case 'SET_EXPIRED':
            return {
                ...state,
                expired: action.payload
            };
        case 'SET_IS_LOGGED_IN':
            return {
                ...state,
                isLoggedIn: action.payload
            };
        case 'SET_USER_EMAIL':
            return {
                ...state,
                userEmail: action.payload
            };
        case 'SET_PRICES':
            return {
                ...state,
                prices: action.payload
            };
        case 'SET_NOTES':
            return {
                ...state,
                notes: action.payload
            };
        case 'SET_SUITABILITY_RATING':
            return {
                ...state,
                suitabilityRating: action.payload
            };
        case 'SET_ADDITIONAL_INFO':
            return {
                ...state,
                additionalInfo: action.payload
            };
        case 'SET_STATISTICS':
            return {
                ...state,
                statistics: {
                    ...state.statistics,
                    ...action.payload
                }
            };
        case 'SET_LIST_CURRENCY':
            return {
                ...state,
                listCurrency: action.payload
            };
        default:
            return state;
    }
}