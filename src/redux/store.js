import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from './authReducer';
import analyzeReducer from "./analyzeReducer";
import snackBarReducer from "./snackBarReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
    authState: authReducer,
    analyzeState: analyzeReducer,
    snackBarState: snackBarReducer
})


export default configureStore({
    reducer: rootReducer
}, composeWithDevTools);