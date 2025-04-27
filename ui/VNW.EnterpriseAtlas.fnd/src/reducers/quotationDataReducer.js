
const headerTemplate = {
    orderName: '',
    startDate: '',
    endDate: '',
    address: '',
    remark: '',
    createDate: '',
};

export const itemTemplate = {
    id: 0,
    name: '',
    code: '',
    image: '',
    specification: '',
    quantity: 0,
    unit: '',
    description: ''
};

export const initialState = {
    id: '',
    header: headerTemplate,
    items: []
};

export const quotationDataReducer = (state, action) => {
    switch (action.type) {
        case 'SET_HEADER':
            return { ...state, recentList: action.payload };
        case 'SET_ITEMS':
            return { ...state, currentPage: action.payload };
        case 'SET_ID':
            return { ...state, id: action.payload };
        case 'SET_ALL':
            return { 
                ...state, 
                id: action.payload.id, 
                header: action.payload.header, 
                items: action.payload.items 
            }; // Cập nhật tất cả dữ liệu
        default:
            return state;
    }
};