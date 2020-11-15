import "./App.css";
import { Fragment, useEffect, useState } from "react";
import axios, { API_URL, WEATHER_APP_KEY } from "./config";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  YAxis,
} from "recharts";
import { kalvinToCels } from "./utils/kalvinToCels";
import { useDebounce } from "./hooks/useThrottle";

function App() {
  const [city, setCity] = useState("");
  const [cityInfo, setCityInfo] = useState(undefined);
  const [temperatureData, setTemperatureData] = useState(undefined);

  const enteredCity = useDebounce(city, 1000);

  useEffect(() => {
    if (enteredCity) {
      axios
        .get(`${API_URL}?q=${enteredCity}&appId=${WEATHER_APP_KEY}`)
        .then((response) => {
          if (response.status === 200) {
            setCityInfo(response.data.city);
            setTemperatureData(
              response.data.list.map((weatherData) => ({
                time: new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric",
                }).format(new Date(weatherData.dt_txt).getTime()),
                temperature: kalvinToCels(weatherData.main.temp),
                maxTemperature: kalvinToCels(weatherData.main.temp_max),
                minTemperature: kalvinToCels(weatherData.main.temp_min),
                weather: weatherData.weather,
              }))
            );
          }
        });
    }
  }, [enteredCity]);

  return (
    <div className="App">
      <header className="App__Header">
        <input
          onChange={(e) => setCity(e.target.value)}
          placeholder="Please enter the city name"
        />
      </header>
      <main>
        {cityInfo && temperatureData ? (
          <Fragment>
            <h1>Weather forecast for 5 days: </h1>
            <LineChart
              width={500}
              height={300}
              data={temperatureData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <YAxis dataKey="temperature" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="temperature"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="maxTemperature" stroke="#82ca9d" />
              <Line type="monotone" dataKey="maxTemperature" stroke="#00bfff" />
            </LineChart>
          </Fragment>
        ) : (
          <h3>No city found, please enter the desired city</h3>
        )}
      </main>
    </div>
  );
}

export default App;
