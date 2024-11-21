import { createSlice } from "@reduxjs/toolkit";

export const passwordResetSlice = createSlice({
    name: "passwordReset",
    initialState: {
        password: "",
        confirmPassword: "",
    },
    reducers: {
        passwordReset: (state, action) => {
            return {
                ...state,
                ...action.payload
            };
        },
    },
});