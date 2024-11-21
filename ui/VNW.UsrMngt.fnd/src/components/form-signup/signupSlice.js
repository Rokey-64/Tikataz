import { createSlice } from "@reduxjs/toolkit";

export const signupSlice = createSlice({
    name: "signup",
    initialState: {
        email: "",
        password: "",
        confirmPassword: "",
        userName: ""
    },
    reducers: {
        signup: (state, action) => {
            return {
                ...state,
                ...action.payload
            };
        },
    },
});