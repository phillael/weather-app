import { Container, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import moment from "moment";
import React, { FC } from "react";
import DarkModeButton from "../dark-mode-button";
import { CurrentWeatherProps } from "./current-weather.props";

const CurrentWeather: FC<CurrentWeatherProps> = ({ data }) => (
  <VStack minH={8}>
    <Heading as="h3">{data.city}</Heading>
    <Text fontSize="5xl">{parseInt(data.main?.temp)}&#176;f</Text>
    <Text>{data.weather[0].description}</Text>
  </VStack>
);

export default CurrentWeather;
