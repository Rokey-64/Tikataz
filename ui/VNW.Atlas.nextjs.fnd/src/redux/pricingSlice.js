import { createSlice } from "@reduxjs/toolkit";

/**
 * This slice is used to implement the RFQ pricing
 */
const slice = createSlice({
    name: 'pricing',
    initialState: {
        id: '',
        orderName: '',
        orderCreatedAt: '',
        orderDueDate: '',
        orderAddress: '',
        orderRemark: '',
        pricing: [
            /**{id, price, currency, duration}*/
        ]
    },
    reducers: {
        setPricing: (state, action) => {
            state.pricing = action.payload;
        }
    }
});

export const { setPricing } = slice.actions;
export default slice.reducer;