import {createSlice} from '@reduxjs/toolkit';

export const authsSlice = createSlice({
    name: 'auths',
    initialState: {
        loginName: '',
    },
    reducers: {
        auths: (state, action) => {
            state.loginName = action.payload.loginName;
        },
    },
});