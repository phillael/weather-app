import { FC } from "react";
import { ForecastProps } from "./forecast.props";
import { Container } from "@chakra-ui/react";
import ForecastRow from "../forecast-row";

const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const Forecast: FC<ForecastProps> = ({ data }) => {
  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, dayInAWeek)
  );

  return (
    <Container>
      {data.list.slice(0, 7).map((item, idx) => (
        <ForecastRow
          key={forecastDays[idx]}
          image={item.weather[0].icon}
          day={forecastDays[idx]}
          description={item.weather[0].description}
          high={item.main.temp_max}
          low={item.main.temp_min}
          idx={idx}
        />
      ))}
    </Container>
  );
};

export default Forecast;
