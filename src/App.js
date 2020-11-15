import "./App.css";
import { Fragment, useEffect, useState } from "react";
import { WeatherChart, Input, CityInfo } from "./components";
import { useDebounce } from "./hooks/useThrottle";
import { getTemperatureData } from "./store/weather";
import { connect } from "react-redux";
import { array, func, number, shape, string } from "prop-types";

const App = ({ currentCity, temperatureData, getTemperatureData }) => {
  const [city, setCity] = useState("");
  const enteredCity = useDebounce(city, 1000);

  useEffect(() => {
    if (enteredCity) {
      getTemperatureData(enteredCity);
    }
  }, [enteredCity, getTemperatureData]);

  return (
    <div className="App">
      <header className="App__Header">
        <Input placeholder="Please enter the city name" setValue={setCity} />
      </header>
      <main>
        {currentCity && temperatureData ? (
          <Fragment>
            <h1>Weather forecast for 5 days: </h1>
            <CityInfo cityInfo={currentCity} />
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
};

App.propTypes = {
  getTemperatureData: func,
  currentCity: shape({
    name: string,
    sunrise: number,
    sunset: number,
    country: string,
  }),
  temperatureData: array,
};

const mapStateToProps = (state) => ({
  currentCity: state.weather.currentCity,
  temperatureData: state.weather.temperatureData,
});

export default connect(mapStateToProps, { getTemperatureData })(App);
