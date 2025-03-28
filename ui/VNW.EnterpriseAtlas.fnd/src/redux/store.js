import { configureStore } from "@reduxjs/toolkit";
import tagReducer from "./tags_slice";
import statusReducer from "./status_slice";
import tagIndexReducer from "./tagIndex_slice";
import profileReducer from "./profile_slice";
import branchesReducer from "./branchesSlice";
import leadersReducer from "./leadersSlice";
import optionsReducer from "./optionsSlice";
import cardsReducer from "./cardsSlice";
import inlineCardsReducer from "./inlineCardSlice";
import pricingReducer from "./pricingSlice";


const store = configureStore({ 
    reducer: {
        tags:tagReducer,
        status:statusReducer,
        tagIndex:tagIndexReducer,
        profile:profileReducer,
        branches:branchesReducer,
        leaders:leadersReducer,
        options:optionsReducer,
        cards: cardsReducer,
        inlineCards: inlineCardsReducer,
        pricing: pricingReducer
    } 
});
export default store;