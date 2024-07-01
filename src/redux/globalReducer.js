import { createSlice } from "@reduxjs/toolkit";
import { openSnackBar } from "./snackBarReducer";

export const globalSlice = createSlice({
    name: "global",
    initialState: {
        setLoadingState: false,
        loading: false,
    },
    reducers: {
        setLoadingRequest: state => {
            state.setLoadingState = true
        },
        setLoadingSuccess: (state, action) => {
            state.setLoadingState = false;
            state.loading = action.payload;
        },
        setLoadingFailed: (state, action) => {
            state.setLoadingState = false;
        },
    }
});

const {
    setLoadingFailed, setLoadingRequest, setLoadingSuccess,
} = globalSlice.actions;

export const setLoading = (state) => async (dispatch) => {

    dispatch(setLoadingRequest());

    try {
        dispatch(setLoadingSuccess(state));
    } catch (error) {
        dispatch(setLoadingFailed());
        dispatch(openSnackBar({ message: error["message"], status: 'error' }));
        throw new Error(error);
    }
}

export default globalSlice.reducer;