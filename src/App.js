import "./App.css";
import { Fragment, useEffect, useState } from "react";
import axios, { API_URL, WEATHER_APP_KEY } from "./config";
import { kalvinToCels } from "./utils/kalvinToCels";
import { useDebounce } from "./hooks/useThrottle";
import { WeatherChart, Input, CityInfo } from "./components";

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
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric",
                }).format(new Date(weatherData.dt_txt).getTime()),
                temperature: kalvinToCels(weatherData.main.temp),
                maxTemperature: kalvinToCels(weatherData.main.temp_max),
                minTemperature: kalvinToCels(weatherData.main.temp_min),
                weather: weatherData.weather,
                description: weatherData.weather[0].description,
              }))
            );
          }
        });
    }
  }, [enteredCity]);

  return (
    <div className="App">
      <header className="App__Header">
        <Input placeholder="Please enter the city name" setValue={setCity} />
      </header>
      <main>
        {cityInfo && temperatureData ? (
          <Fragment>
            <h1>Weather forecast for 5 days: </h1>
            <CityInfo cityInfo={cityInfo} />
            <WeatherChart
              class="App__Info--Temp"
              temperatureData={temperatureData}
            />
          </Fragment>
        ) : (
          <h3>No city found, please enter the desired city</h3>
        )}
      </main>
    </div>
  );
}

export default App;
