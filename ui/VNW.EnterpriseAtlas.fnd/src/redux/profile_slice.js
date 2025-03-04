import { createSlice } from "@reduxjs/toolkit";

/**
 * This slice is used to store the profile of the company
 */
const slice = createSlice({
    name: 'profile',
    initialState: {
            name: "",
            taxCode: "",
            date: "",
            nation: { value: "", id: "" },
            address: "",
            phone: "",
            email: "",
            fax: "",
            vision: "",
            mission: "",
            logo: "/logo.svg",
            businessField: ""
        },
    reducers: {
        setProfile: (state, action) => {
            return action.payload;
        }
    }
});

export const { setProfile } = slice.actions;
export default slice.reducer;