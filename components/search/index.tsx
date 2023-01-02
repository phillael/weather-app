import {
  Button,
  FormControl,
  HStack,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import React, { FC, FormEvent, useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiOptions, GEO_API_URL } from "../../api/weather/weather-api";
import { SearchProps } from "./search.props";

const Search: FC<SearchProps> = ({ onSearchChange, onSubmit }) => {
  const [search, setSearch] = useState("");

  const loadOptions = (inputValue: string) => {
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city: any) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
        };
      });
  };

  const handleOnChange = (searchData: any) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <form style={{ width: "100%" }}>
      <FormControl w="100%" maxW="500px" justifyContent="center">
        <AsyncPaginate
          placeholder="Search for city"
          debounceTimeout={600}
          value={search}
          onChange={handleOnChange}
          loadOptions={loadOptions}
        />
      </FormControl>
    </form>
  );
};

export default Search;
