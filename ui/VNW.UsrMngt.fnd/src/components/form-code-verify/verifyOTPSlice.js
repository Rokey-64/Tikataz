import { createSlice } from "@reduxjs/toolkit";

export const verifyOTPSlice = createSlice({
    name: "verifyOTP",
    initialState: {
        otp: "",
    },
    reducers: {
        verifyOTP: (state, action) => {
            state.otp = action.payload.otp;
        },
    },
});