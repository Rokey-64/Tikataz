import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
   name: "tags",
   initialState: [],
   reducers: {
      addTag: (state, action) => {
         state.push(...action.payload);
      },

      clearTag: (state) => {
         return [];
      },

      clearAndUpdateTag: (state, action) => {
         return action.payload;
      },
   },
});

export const { addTag, clearTag, clearAndUpdateTag} = slice.actions;
export default slice.reducer;