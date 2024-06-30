import { createSlice } from "@reduxjs/toolkit";
import { analyzeService } from '../services/analyze.service'
import { openSnackBar } from "./snackBarReducer";

export const analyzeSlice = createSlice({
    name: "analyze",
    initialState: {
        getAnalyzeOverviewStatus: false,
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
        }
    }
});

const {
    getAnalyzeOverviewFailed, getAnalyzeOverviewRequest, getAnalyzeOverviewSuccess
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

export default analyzeSlice.reducer;