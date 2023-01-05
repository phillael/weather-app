import { WeatherResponse } from "../../models/weather-store/weather-store.types";

export interface CurrentWeatherProps {
  /** Current Weather data */
  data: WeatherResponse;
}
