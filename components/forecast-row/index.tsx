import { FC } from "react";
import {
  Flex,
  HStack,
  Text,
  Image,
  VStack,
  SlideFade,
  useDisclosure,
} from "@chakra-ui/react";
import { ForecastRowProps } from "./forecast-row.types";
import { observer } from "mobx-react-lite";

const ForecastRow: FC<ForecastRowProps> = observer(
  ({ image, day, description, high, low, idx }) => {
    const { isOpen, onOpen } = useDisclosure();

    // A function to make rows fade in one at a time
    setTimeout(() => {
      onOpen();
    }, 500 * idx);

    return (
      <SlideFade in={isOpen} offsetY="30px">
        <VStack>
          <Flex
            w="100%"
            borderBottom="2px solid grey"
            justifyContent="space-between"
          >
            <HStack spacing={2}>
              <Image
                src={`http://openweathermap.org/img/w/${image}.png`}
                alt={description}
                loading="eager"
              />
              <Text>{day}</Text>
            </HStack>
            <HStack>
              <Text>{description}</Text>
              <Text>
                {`${parseInt(high)}`}
                <span>&#176;f</span>
              </Text>
              <Text color="gray.500">
                {`${parseInt(low)}`}
                <span>&#176;f</span>
              </Text>
            </HStack>
          </Flex>
        </VStack>
      </SlideFade>
    );
  }
);

export default ForecastRow;
