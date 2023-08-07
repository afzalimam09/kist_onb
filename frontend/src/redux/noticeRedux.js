import { createSlice } from "@reduxjs/toolkit";

export const noticeSlice = createSlice({
    name: "notice",
    initialState: {
        noticeData: {},
        isFetching: false,
        error: false,
    },
    reducers: {
        // Get All
        getNoticeStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        getNoticeSuccess: (state, action) => {
            state.isFetching = false;
            state.noticeData = action.payload;
        },
        getNoticeFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
    },
});

export const { getNoticeStart, getNoticeSuccess, getNoticeFailure } =
    noticeSlice.actions;

export default noticeSlice.reducer;
