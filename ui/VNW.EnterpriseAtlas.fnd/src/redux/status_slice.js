import {createSlice} from '@reduxjs/toolkit';
import { clear } from '@testing-library/user-event/dist/clear';

const slice = createSlice({
    name: "status",
    initialState: [],
    reducers: {
        addStatus: (state, action) => {
            state.push(...action.payload);
        },
        updateStatus: (state, action) => {
            const index = action.payload.index;
            state[index] = action.payload.status;
        },

        clearStatus: (state) => {
            return [];
        },

        clearAndUpdateStatus: (state, action) => {
            return action.payload;
        }
    },
});

export const {addStatus, updateStatus, clearStatus, clearAndUpdateStatus} = slice.actions;
export default slice.reducer;