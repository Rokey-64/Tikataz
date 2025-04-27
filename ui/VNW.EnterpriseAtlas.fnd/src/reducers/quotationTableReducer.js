

export const initialState = {
    recentList: [],
    pageCount: 0,
    hoveredRow: null,
    orderStopDataRow: null,
    orderRestoreDataRow: null,
    currentPage: 1,
    stateRef: {
        pending: "PENDING",
        processing: "PROCESSING",
        rejected: "REJECTED",
        finished: "FINISHED",
        overdue: "OVERDUE",
        all: "ALL"
    }
};

export const quotationTableReducer = (state, action) => {
    switch (action.type) {
        case 'SET_RECENT_LIST':
            return {
                ...state,
                recentList: action.payload,
            };
        case 'SET_PAGE_COUNT':
            return {
                ...state,
                pageCount: action.payload,
            };
        case 'SET_HOVERED_ROW':
            return {
                ...state,
                hoveredRow: action.payload,
            };
        case 'SET_ORDER_STOP':
            return {
                ...state,
                orderStopDataRow: action.payload,
            };
        case 'SET_ORDER_RESTORE':
            return {
                ...state,
                orderRestoreDataRow: action.payload,
            };
        case 'SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.payload,
            };
        default:
            return state;
    }
}