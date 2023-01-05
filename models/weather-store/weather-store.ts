import { action } from "mobx";
import { flow, types } from "mobx-state-tree";
import { WEATHER_API_KEY, WEATHER_API_URL } from "../../api/weather";
import { CurrentWeather, Forecast, UserLocation } from "./weather-store.types";

export const WeatherStore = types
  .model("Weather")
  .props({
    /** User's current location */
    userLocation: types.maybe(types.frozen<UserLocation>()),
    /** currentWeather in given location */
    currentWeather: types.maybe(types.frozen<CurrentWeather>()),
    /** Forcast weather in given location */
    forecast: types.maybe(types.frozen<Forecast>()),
    /** Loading state */
    isLoading: types.maybe(types.boolean),
    /** User's saved location */
    savedLocation: types.maybe(types.string),
  })
  .actions((self) => ({
    setCurrentWeather: (currentWeather: CurrentWeather) => {
      self.currentWeather = currentWeather;
    },
    setForecast: (forecast: Forecast) => {
      self.forecast = forecast;
    },
    setUserLocation: (userLocation: UserLocation) => {
      self.userLocation = userLocation;
    },
  }))
  .actions((self) => ({
    setCurrentWeather: (currentWeather: CurrentWeather) => {
      self.currentWeather = currentWeather;
    },
    setForecast: (forecast: Forecast) => {
      self.forecast = forecast;
    },
    setUserLocation: (userLocation: UserLocation) => {
      self.userLocation = userLocation;
    },
  }))
  .actions((self) => ({
    fetchWeather: flow(function* (searchData) {
      // get latitude and longitude of search location
      self.isLoading = true;
      const [lat, lon] = searchData.value.split(" ");

      try {
        const currentWeatherFetch = yield fetch(
          `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=imperial`
        );
        const forecastFetch = yield fetch(
          `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=imperial`
        );
        Promise.all([currentWeatherFetch, forecastFetch]).then(
          async (response) => {
            const weatherResponse = await response[0].json();
            const forcastResponse = await response[1].json();
            self.setCurrentWeather(weatherResponse);
            self.setForecast(forcastResponse);
            // console.log("!@# weatherResponse", weatherResponse);
            // console.log("!@# forecastResponse", forcastResponse);
          }
        );
      } catch (err) {
        console.log("!@#", err);
      } finally {
        self.isLoading = false;
      }
    }),
  }))
  .actions((self) => ({
    fetchUserLocation: flow(function* (position: GeolocationPosition) {
      // Use Geolocation API to get user's location
      self.isLoading = true;
      try {
        const fetchLocation = yield fetch(
          `http://api.openweathermap.org/geo/1.0/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&limit=1&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}`
        );
        Promise.all([fetchLocation]).then(async (response) => {
          const userLocationResponse = await response[0].json();

          // Get/format data needed to pass into fetchWeather
          const { country, name, lat, lon } = userLocationResponse[0];
          self.setUserLocation({
            value: `${lat} ${lon}`,
            label: `${name}, ${country}`,
          });
        });
        if (self.userLocation) {
          console.log("!@# fetching weather at user's location");
          self.fetchWeather(self.userLocation);
        }
      } catch (err) {
        console.log(err);
      }
    }),
  }));
