import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useCreateStore, useProvider } from "mobx-store-provider";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { WeatherStore } from "../models/weather-store";

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

const theme = extendTheme({ colors });

export default function App({ Component, pageProps }: AppProps) {
  // Instantiate appStore inside the App component using useCreateStore
  const weatherStore = useCreateStore(WeatherStore);
  // Retrieve the Provider for the appStore
  const Provider = useProvider(WeatherStore);

  return (
    <Provider value={weatherStore}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}
