import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
   name: "tagIndex",
   initialState: {_id: "", major: ""},
   reducers: {
      addIndex: (state, action) => {
        return {
            ...state, 
            ...action.payload,
        };
      }
   },
});

export const { addIndex} = slice.actions;
export default slice.reducer;