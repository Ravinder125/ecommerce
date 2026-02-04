import { createSlice } from "@reduxjs/toolkit";
import { fetchUser } from "./authThunk";
import type { User } from "../../types/user.type";

interface AuthState {
    user: User | null;
    isLoading: boolean;
}

const initialState: AuthState = {
    user: null,
    isLoading: true,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearUser(state) {
            state.user = null;
            state.isLoading = false;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchUser.pending, state => {
                state.isLoading = true;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchUser.rejected, state => {
                state.user = null;
                state.isLoading = false;
            });
    },
});

export const { clearUser } = authSlice.actions;
export default authSlice.reducer;
