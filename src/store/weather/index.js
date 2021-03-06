import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { API_URL, WEATHER_APP_KEY } from "../../config";
import { kalvinToCels } from "../../utils/kalvinToCels";

const initialState = {
  loading: false,
  error: "",
  currentCity: undefined,
  temperatureData: undefined,
};

const getTemperatureData = createAsyncThunk(
  "weather/fetch",
  (city, { rejectWithValue, dispatch }) => {
    dispatch(weatherSlice.actions.setLoading(true));

    return new Promise((resolve, _) => {
      axios
        .get(`${API_URL}?q=${city}&appId=${WEATHER_APP_KEY}`)
        .then((response) => response.status === 200 && resolve(response.data))
        .catch((error) => rejectWithValue(error))
        .finally(() => dispatch(weatherSlice.actions.setLoading(false)));
    });
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setLoading(state, status) {
      state.loading = status;
    },
    setError(state, error) {
      state.error = error;
    },
  },
  extraReducers: {
    [getTemperatureData.fulfilled]: (state, action) => {
      const { city, list } = action.payload;
      state.currentCity = city;
      state.temperatureData = list.map((weatherData) => ({
        time: new Intl.DateTimeFormat("en-US", {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        }).format(new Date(weatherData.dt_txt).getTime()),
        temperature: kalvinToCels(weatherData.main.temp),
        maxTemperature: kalvinToCels(weatherData.main.temp_max),
        minTemperature: kalvinToCels(weatherData.main.temp_min),
        weather: weatherData.weather,
        description: weatherData.weather[0].description,
      }));
    },
    [getTemperatureData.rejected]: (state, action) => {
      state.error = action.payload;
    },
  },
});

export { getTemperatureData };
export default weatherSlice.reducer;
