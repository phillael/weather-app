import {
  Flex,
  Heading,
  Text,
  VStack,
  Image,
  SlideFade,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import { CurrentWeatherProps } from "./current-weather.props";

const CurrentWeather: FC<CurrentWeatherProps> = observer(({ data }) => (
  <SlideFade in={true} offsetY="30px">
    <VStack
      minH={10}
      py={2}
      px={20}
      spacing={2}
      border="1px grey solid"
      borderRadius={10}
      mb={6}
      boxShadow="5px 5px 20px black"
    >
      <Heading as="h3">{`${data.name}, ${data.sys.country}`}</Heading>
      <Text>{data.weather[0].description}</Text>
      <Flex mt="0" w="100%" justifyContent="center" alignItems="center">
        <Image
          src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
          alt={data.weather[0].description}
          px={2}
        />
        <VStack>
          <Text fontSize="2xl" px={2}>
            {parseInt(data.main.temp)}&#176;f
          </Text>
        </VStack>
      </Flex>
    </VStack>
  </SlideFade>
));

export default CurrentWeather;
