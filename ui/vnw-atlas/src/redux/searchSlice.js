import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: "search",
    initialState: {
        value: "",
        ofset: 0,
    },
    reducers: {
        setSearchValue: (state, action) => {
            state.value = action.payload;
        },
        clearSearchValue: (state) => {
            state.value = "";
        },
        setOfset: (state, action) => {
            state.ofset = action.payload;
        },
        clearOfset: (state) => {
            state.ofset = 0;
        },
        clearSearch: (state) => {
            state.value = "";
            state.ofset = 0;
        }
    }
});

export const { setSearchValue, clearSearchValue, setOfset, clearOfset, clearSearch} = slice.actions;
export default slice.reducer;