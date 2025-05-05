import { createSlice } from "@reduxjs/toolkit";

/**
 * This slice is used to store the branches of the company
 */
const slice = createSlice({
    name: 'branches',
    initialState: [
        /**
         * {
         *  id: "", The id of the branch 
         *  name: "", The name of the branch
         *  taxcode: "", The tax code of the branch
         *  date: "", The date of the branch
         *  phone: "", The phone number of the branch
         *  email: "", The email of the branch
         *  address: "" The address of the branch
         * }
         */
    ],
    reducers: {
        /** Load branches from the server for the first time */
        setBranches: (state, action) => {
            return action.payload;
        },

        /** Insert a branch into the branches array */
        insertBranch: (state, action) => {
            state.push(action.payload);
        },

        /** Update a branch in the branches array */
        updateBranch: (state, action) => {
            const index = state.findIndex(branch => branch.id === action.payload.id);
            if (index >= 0){
                state[index] = action.payload;
            }
        },

        /** Delete a branch from the branches array */
        deleteBranch: (state, action) => {
            return state.filter(branch => action.payload.includes(branch.id) === false);
        }
    }
});

export const { setBranches, insertBranch, updateBranch, deleteBranch} = slice.actions;
export default slice.reducer;