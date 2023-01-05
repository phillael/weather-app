export interface WeatherResponse {
  main: {
    temp: number;
  };
  weather: {
    description: string;
  };
}

export interface CurrentWeather {
  city: string;
  weatherResponse: WeatherResponse;
}

export interface Forecast {
  city: string;
  forecast: WeatherResponse[];
}

export interface UserLocation {
  value: string;
  label: string;
}
