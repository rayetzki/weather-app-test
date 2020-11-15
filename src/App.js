import "./App.css";
import { Fragment, useEffect, useState } from "react";
import { WeatherChart, Input, CityInfo, Loader } from "./components";
import { useDebounce } from "./hooks/useThrottle";
import { getTemperatureData } from "./store/weather";
import { connect } from "react-redux";
import { array, bool, func, number, shape, string } from "prop-types";

const App = ({
  currentCity,
  temperatureData,
  getTemperatureData,
  loading,
  error,
}) => {
  const [city, setCity] = useState("");
  const enteredCity = useDebounce(city, 1000);

  useEffect(() => {
    if (enteredCity) {
      getTemperatureData(enteredCity);
    }
  }, [enteredCity, getTemperatureData]);

  return (
    <div className="App">
      {loading ? (
        <Loader open={loading} />
      ) : (
        <Fragment>
          <header className="App__Header">
            <Input
              placeholder="Please enter the city name"
              setValue={setCity}
            />
          </header>
          <main>
            {error && <span className="App__Error">{error.message}</span>}
            {currentCity && temperatureData ? (
              <Fragment>
                <h1>Weather forecast for 5 days: </h1>
                <CityInfo cityInfo={currentCity} />
                <WeatherChart
                  className="App__Info--Temp"
                  temperatureData={temperatureData}
                />
              </Fragment>
            ) : (
              <h3>No city found, please enter the desired city</h3>
            )}
          </main>
        </Fragment>
      )}
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
  loading: bool,
  error: string,
};

const mapStateToProps = ({ weather }) => ({
  currentCity: weather.currentCity,
  temperatureData: weather.temperatureData,
  loading: weather.loading,
  error: weather.error,
});

export default connect(mapStateToProps, { getTemperatureData })(App);
