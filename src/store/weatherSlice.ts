/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WeatherState {
  city: string;
  latitude: string;
  longitude: string;
  useCurrentLocation: boolean;
  weatherData: any | null;
  loading: boolean;
  error: string | null;
  userPreferences: {
    lastSearchedCity: string;
    temperatureUnit: "C" | "F";
  };
}

const initialState: WeatherState = {
  city: "",
  latitude: "",
  longitude: "",
  useCurrentLocation: false,
  weatherData: null,
  loading: false,
  error: null,
  userPreferences: {
    lastSearchedCity: "",
    temperatureUnit: "C", // i would prefer "Celsius" as Default because i am from Israel 😁 (we really Don't Like Fahrenheit Over Here)
  },
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setCity(state, action: PayloadAction<string>) {
      state.city = action.payload;
    },
    setLastSearchedCity(state, action: PayloadAction<string>) {
      state.userPreferences.lastSearchedCity = action.payload;
    },
    setTemperatureUnit(state, action: PayloadAction<"C" | "F">) {
      state.userPreferences.temperatureUnit = action.payload;
    },
    setLatitude(state, action: PayloadAction<string>) {
      state.latitude = action.payload;
    },
    setLongitude(state, action: PayloadAction<string>) {
      state.longitude = action.payload;
    },
    setUseCurrentLocation(state, action: PayloadAction<boolean>) {
      state.useCurrentLocation = action.payload;
    },
    fetchWeatherStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchWeatherSuccess(state, action: PayloadAction<any>) {
      state.weatherData = action.payload;
      state.loading = false;
    },
    fetchWeatherFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setCity,
  setLatitude,
  setLongitude,
  setUseCurrentLocation,
  fetchWeatherStart,
  fetchWeatherSuccess,
  fetchWeatherFailure,
  setLastSearchedCity,
  setTemperatureUnit,
} = weatherSlice.actions;

export default weatherSlice.reducer;
