import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        isFetching: false,
        isError: false,
        error: "",
    },
    reducers: {
        loginStart: (state) => {
            state.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
            state.isError = false;
            state.error = "";
        },
        loginFailure: (state, action) => {
            state.isFetching = false;
            state.currentUser = "";
            state.isError = true;
            state.error = action.payload;
        },
        logout: (state) => {
            state.currentUser = null;
        },
        updateSuccess: (state, action) => {
            state.currentUser.data = action.payload;
        },
    },
});

export const { loginStart, loginSuccess, loginFailure, logout, updateSuccess } =
    userSlice.actions;
export default userSlice.reducer;
