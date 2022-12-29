import React from "react";
import { Button, Flex, useColorMode } from "@chakra-ui/react";
import { MoonIcon } from "@chakra-ui/icons";

const DarkModeButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button
      position="absolute"
      right="27px"
      top="27px"
      variant="unstyled"
      size="lg"
      onClick={() => toggleColorMode()}
    >
      <MoonIcon />
    </Button>
  );
};

export default DarkModeButton;
