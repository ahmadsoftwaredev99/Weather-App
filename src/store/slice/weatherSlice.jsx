import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const weatherApi = createAsyncThunk(
  "weather/app",
  async (city, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`,
      );
      console.log(import.meta.env.VITE_APP_ID);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const weatherSlice = createSlice({
  name: "weatherSlice",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(weatherApi.pending, (state, action) => {
        state.loading = true;
        state.error = null
      })
      .addCase(weatherApi.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(weatherApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "City Not Found ";
      });
  },
});

export default weatherSlice.reducer;
