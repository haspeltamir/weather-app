/* eslint-disable @typescript-eslint/no-explicit-any */
/*
Redux Slice:
  My Explanation:
    "Slice": in Redux, is a collection of reducer functions and actions for a specific feature 
      in your application.
    
    "createSlice": is a function that takes an initial state, an object full of reducer functions,
      and a "slice name", in order to generates a slice object that 
      contains the generated reducer functions as well as action creators
    
    "Reducers": are functions that specify how the state changes in response to actions sent to the store.
    
    "Actions": are payloads of information that send data from your application to your store.
*/

// Redux Toolkit is a wrapper around Redux that helps you write Redux logic in a more efficient way.
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//creating the weather state interface
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

//setting the initial state of the weather slice
const initialState: WeatherState = {
  city: "",
  latitude: "",
  longitude: "",
  useCurrentLocation: false,
  weatherData: null,
  loading: false,
  error: null,
  userPreferences: {
    lastSearchedCity: localStorage.getItem("lastSearchedCity") || "", // Load from localStorage
    temperatureUnit:
      (localStorage.getItem("temperatureUnit") as "C" | "F") || "C", // Load from localStorage or fallback to 'C' (I Personally would prefer "Celsius" as Default because i am from Israel 😁 (we really Don't Like Fahrenheit Over Here in Israel))
  },
};

//creating the weather slice

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setCity(state, action: PayloadAction<string>) {
      state.city = action.payload;
      // console.log("state.city", state.city);
      // console.log("action.payload", action.payload);
      // console.log("action", action);
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
