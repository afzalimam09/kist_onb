import { createSlice } from "@reduxjs/toolkit";

export const bookmarkSlice = createSlice({
    name: "bookmark",
    initialState: [],
    reducers: {
        add(state, action) {
            state.unshift(action.payload);
        },
        remove(state, action) {
            return state.filter((item) => item._id !== action.payload);
        },
    },
});

export const { add, remove } = bookmarkSlice.actions;

export default bookmarkSlice.reducer;
