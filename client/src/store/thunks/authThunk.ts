import { createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../../services/auth.service";

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await authService.getProfile();
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Failed to fetch user");
    }
  }
);
