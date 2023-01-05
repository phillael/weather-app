import { flow, types } from "mobx-state-tree";
import { WEATHER_API_KEY, WEATHER_API_URL } from "../../api/weather";
import {
  WeatherForecast,
  UserLocation,
  WeatherResponse,
} from "./weather-store.types";

export const WeatherStore = types
  .model("Weather")
  .props({
    /** User's current location */
    userLocation: types.maybe(types.frozen<UserLocation>()),
    /** currentWeather in given location */
    currentWeather: types.maybe(types.frozen<WeatherResponse>()),
    /** Forcast weather in given location */
    forecast: types.maybe(types.frozen<WeatherForecast>()),
    /** Loading state */
    isLoading: types.maybe(types.boolean),
    /** User's saved location */
    savedLocation: types.maybe(types.string),
    /** State for dealing with errors */
    error: types.maybe(types.boolean),
  })
  .actions((self) => ({
    setCurrentWeather: (currentWeather: WeatherResponse) => {
      self.currentWeather = currentWeather;
    },
    setForecast: (forecast: WeatherForecast) => {
      self.forecast = forecast;
    },
    setUserLocation: (userLocation: UserLocation) => {
      self.userLocation = userLocation;
    },
    setIsLoading: (loading: boolean) => {
      self.isLoading = loading;
    },
    setError(err: boolean) {
      self.error = err;
    },
  }))
  .actions((self) => ({
    fetchWeather: function (searchData: any) {
      // assign a type for search data
      const [lat, lon] = searchData.value.split(" ");
      self.isLoading = true;
      return Promise.all([
        fetch(
          `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=imperial`
        )
          .then((res) => res.json())
          .then((data) => self.setCurrentWeather(data)),
        fetch(
          `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=imperial`
        )
          .then((res) => res.json())
          .then((data) => self.setForecast(data)),
      ])
        .catch((err) => {
          console.log(err);
          self.setError(true);
        })
        .finally(() => {
          self.setIsLoading(false);
        });
    },
  }))
  .actions((self) => ({
    fetchUserLocation: function (position: GeolocationPosition) {
      // Use Geolocation API to get user's location
      self.isLoading = true;

      return Promise.all([
        fetch(
          `https://api.openweathermap.org/geo/1.0/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&limit=1&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}`
        )
          .then((res) => res.json())
          .then((data) =>
            self.setUserLocation({
              value: `${data[0].lat} ${data[0].lon}`,
              label: `${data[0].name}, ${data[0].country}`,
            })
          )
          .catch((err) => {
            console.log(err);
            self.setError(true);
          })
          .finally(() => {
            self.fetchWeather(self.userLocation);
          }),
      ]);
    },
  }));
