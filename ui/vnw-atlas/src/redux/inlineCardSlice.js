import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: "inlineCards",
    initialState: {
        inlineCards: [
            /**
             * {
             *     _id: 1,
             *     status: "",
             *     general: {
             *        logo: "",
             *        branchName: "Nội thất Hòa Phát",
             *        description: ""
             *    },
             *    createdAt: "11-12-2024",
             *    mode: "Công khai",
             *    rate: "100👍 - 3.5✨ - 35✍"  
             *    RFQ: "1000 / 200 (10%)",
             * }
             */
        ],
    },
    reducers: {
        setInlineCards: (state, action) => {
            state.inlineCards = action.payload;
        },
    },
});

export const { setInlineCards } = slice.actions;
export default slice.reducer;