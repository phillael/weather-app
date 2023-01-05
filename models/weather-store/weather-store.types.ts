export interface WeatherResponse {
  name: string;
  sys: {
    country: string;
  };
  main: {
    temp: string;
    temp_max: string;
    temp_min: string;
  };
  weather: Weather[];
}

export interface Weather {
  description: string;
  icon: string;
}
export interface ForecastListItem {
  main: {
    temp: string;
    temp_max: string;
    temp_min: string;
  };
  weather: Weather[];
}
export interface WeatherForecast {
  list: ForecastListItem[];
}

export interface UserLocation {
  value: string;
  label: string;
}
