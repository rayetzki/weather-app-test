import axios from "axios";

axios.defaults.baseURL = "localhost:3000";

export const WEATHER_APP_KEY = "bad46dfee1ae1125ec4faf31e63449de";
export const API_URL = "https://api.openweathermap.org/data/2.5/forecast";

export default axios;
