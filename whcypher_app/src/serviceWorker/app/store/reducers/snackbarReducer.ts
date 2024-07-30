import { createSlice } from '@reduxjs/toolkit';

const initialState = { 
    variant: "alert",
    message: "",
    open: false
};

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    setError(state, action) {
        state.variant = "error";
        state.message = action.payload;
        state.open = true;
    },
    setWarning(state, action) {
        state.variant = "warning";
        state.message = action.payload;
        state.open = true;
    },
    setBetaWarning(state) {
        state.variant = "warning";
        state.message = "This software is a release candidate. It may contain bugs. Use it cautiously.";
        state.open = true;
    },
    setInfo(state, action) {
        state.variant = "info";
        state.message = action.payload;
        state.open = true;
    },
    setSuccess(state, action) {
        state.variant = "success";
        state.message = action.payload;
        state.open = true;
    },
    closeSnackBar(state) {
        state.open = false;
        state.message = "";
    },
  },
});

export const { 
    setError, 
    setWarning, 
    setBetaWarning, 
    setInfo,
    setSuccess,
    closeSnackBar,
} = snackbarSlice.actions;

export default snackbarSlice.reducer;