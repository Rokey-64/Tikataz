import { configureStore } from "@reduxjs/toolkit";
import { loginSlice } from "../components/form-login/loginSlice";
import { signupSlice } from "../components/form-signup/signupSlice";
import { authsSlice } from "../components/form-authenication/authsSlice";
import { passwordResetSlice } from "../components/form-password-reset/passwordResetSlice";
import { verifyOTPSlice } from "../components/form-code-verify/verifyOTPSlice";


const store = configureStore({
    reducer: {
        login: loginSlice.reducer,
        signup: signupSlice.reducer,
        auths: authsSlice.reducer,
        passwordReset: passwordResetSlice.reducer,
        verifyOTP: verifyOTPSlice.reducer,
    },
});

export default store;