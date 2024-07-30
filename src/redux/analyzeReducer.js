import { createSlice } from "@reduxjs/toolkit";
import { analyzeService } from '../services/analyze.service'
import { openSnackBar } from "./snackBarReducer";

export const analyzeSlice = createSlice({
    name: "analyze",
    initialState: {
        getAnalyzeOverviewStatus: false,
        getAnalyzeStatus: false,
        getWalletAnalyzeStatus: false,
    },
    reducers: {
        getAnalyzeOverviewRequest: state => {
            state.getAnalyzeOverviewStatus = true
        },
        getAnalyzeOverviewSuccess: (state, action) => {
            state.getAnalyzeOverviewStatus = false;
            state.AnalyzeOverview = action.payload.AnalyzeOverview;
            state.AnalyzeOverviewCount = action.payload.AnalyzeOverviewCount;
        },
        getAnalyzeOverviewFailed: (state, action) => {
            state.getAnalyzeOverviewStatus = false;
        },
        getAnalyzeRequest: state => {
            state.getAnalyzeStatus = true
        },
        getAnalyzeSuccess: (state, action) => {
            state.getAnalyzeStatus = false;
            state.Analyze = action.payload.Analyze;
            state.AnalyzeCount = action.payload.AnalyzeCount;
        },
        getAnalyzeFailed: (state, action) => {
            state.getAnalyzeStatus = false;
        },
        getWalletAnalyzeRequest: state => {
            state.getWalletAnalyzeStatus = true
        },
        getWalletAnalyzeSuccess: (state, action) => {
            state.getWalletAnalyzeStatus = false;
            state.WalletAnalyze = action.payload.WalletAnalyze;
            state.WalletAnalyzeCount = action.payload.WalletAnalyzeCount;
        },
        getWalletAnalyzeFailed: (state, action) => {
            state.getWalletAnalyzeStatus = false;
        }
    }
});

const {
    getAnalyzeOverviewFailed, getAnalyzeOverviewRequest, getAnalyzeOverviewSuccess,
    getAnalyzeFailed, getAnalyzeRequest, getAnalyzeSuccess,
    getWalletAnalyzeFailed, getWalletAnalyzeRequest, getWalletAnalyzeSuccess,
} = analyzeSlice.actions;

export const getAnalyzeOverview = () => async (dispatch) => {

    dispatch(getAnalyzeOverviewRequest());

    try {
        var payload = await analyzeService.getAnalyzeOverview();
        dispatch(getAnalyzeOverviewSuccess(payload));
        return payload;
    } catch (error) {
        dispatch(getAnalyzeOverviewFailed());
        dispatch(openSnackBar({ message: error["message"], status: 'error' }));
        return false;
    }
}

export const getAnalyze = (token_address1, token_address2) => async (dispatch) => {

    dispatch(getAnalyzeRequest());

    try {
        var payload = await analyzeService.getAnalyze(token_address1, token_address2);
        dispatch(getAnalyzeSuccess(payload));
        return payload;
    } catch (error) {
        dispatch(getAnalyzeFailed());
        dispatch(openSnackBar({ message: error["message"], status: 'error' }));
        return false;
    }
}

export const getWalletAnalyze = (wallet_address) => async (dispatch) => {

    dispatch(getWalletAnalyzeRequest());

    try {
        var payload = await analyzeService.getWalletAnalyze(wallet_address);
        dispatch(getWalletAnalyzeSuccess(payload));
        return payload;
    } catch (error) {
        dispatch(getWalletAnalyzeFailed());
        dispatch(openSnackBar({ message: error["message"], status: 'error' }));
        return false;
    }
}

export default analyzeSlice.reducer;