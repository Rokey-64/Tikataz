import { createSlice } from "@reduxjs/toolkit";

/**
 * This slice is used to store the options that can be used in all of the application
 */
const slice = createSlice({
    name: "options",
    initialState: {
        nations: [
            /**{id, nation_name, code, lang_id}*/
        ],
        timezones: [
            /**{id,timezone,remark}*/
        ],
        languages:[
            /**{id,language, isSupported}*/
        ]
    },
    reducers: {
        setNations: (state, action) => {
            state.nations = action.payload;
        },
        setTimezones: (state, action) => {
            state.timezones = action.payload;
        },
        setLanguages: (state, action) => {
            state.languages = action.payload;
        }
    },
});

export const { setNations, setTimezones, setLanguages} = slice.actions;
export default slice.reducer;