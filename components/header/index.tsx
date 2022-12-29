import { Flex, Heading } from "@chakra-ui/react";
import React from "react";
import DarkModeButton from "../dark-mode-button";

const Header = () => (
  <Flex textAlign="center" w="100%">
    <Heading w="100%" p={8} as="h1">
      Ultimate Weather App!
    </Heading>
    <DarkModeButton />
  </Flex>
);

export default Header;
