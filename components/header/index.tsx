import { Container, Flex, Heading, Text } from "@chakra-ui/react";
import moment from "moment";
import React from "react";
import DarkModeButton from "../dark-mode-button";

const Header = () => (
  <>
    <Flex textAlign="center" w="100%">
      <Heading w="100%" pt={8} as="h1">
        Ultimate Weather App!
      </Heading>
      <DarkModeButton />
    </Flex>
    <Text textAlign="center">
      {moment().format("dddd, MMM Do YYYY, h:mm a")}
    </Text>
  </>
);

export default Header;
