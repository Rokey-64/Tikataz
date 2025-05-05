import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
    name: "login",
    initialState: {
        loginName: "",
        password: "",
    },
    reducers: {
        login: (state, action) => {
            return {
                ...state,
                ...action.payload
            };
        },
    },
});