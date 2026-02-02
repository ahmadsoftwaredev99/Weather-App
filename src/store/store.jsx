import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./slice/weatherSlice";

const store = configureStore({
  reducer: {
    weatherSlice: weatherReducer,
  },
});

export default store