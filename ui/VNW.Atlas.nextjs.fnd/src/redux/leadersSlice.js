import { createSlice } from "@reduxjs/toolkit";

/**
 * This slice is used to store the branches of the company
 */
const slice = createSlice({
    name: 'leaders',
    initialState: [
        /**
         * {
         *  id: "", The id of this object
         *  name: "", The name of the leader
         *  position: "", The position of the leader
         *  date: "", The date of the leader
         *  phone: "", The phone number of the leader
         *  email: "", The email of the leader
         *  slogan: "" The slogan of the leader
         *  logo: "" The avatar of the leader
         * }
         */
    ],
    reducers: {
        /** Load leaders from the server for the first time */
        setLeaders: (state, action) => {
            return action.payload;
        },

        /** Insert a leader into the branches array */
        insertLeaders: (state, action) => {
            state.push(action.payload);
        },

        /** Update a leader in the branches array */
        updateLeaders: (state, action) => {
            const index = state.findIndex(branch => branch.id === action.payload.id);
            if (index >= 0){
                state[index] = action.payload;
            }
        },

        /** Delete a branch from the branches array */
        deleteLeaders: (state, action) => {
            return state.filter(branch => action.payload.includes(branch.id) === false);
        }
    }
});

export const { setLeaders, insertLeaders, updateLeaders, deleteLeaders} = slice.actions;
export default slice.reducer;