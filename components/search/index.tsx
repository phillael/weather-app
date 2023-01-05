import { FormControl } from "@chakra-ui/react";
import React, { FC, useEffect, useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiOptions, GEO_API_URL } from "../../api/weather/weather-api";
import { SearchProps } from "./search.props";
import { observer } from "mobx-react-lite";

const inputStyle = {
  width: "80%",
  "text-align": "center",
};

const Search: FC<SearchProps> = observer(({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const loadOptions = (inputValue: string) => {
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data?.map((city: any) => {
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

  // Set initial search to user's location
  //   useEffect(() => {
  //     //   setSearch(userLocation);
  //     loadOptions(userLocation);
  //   }, [userLocation]);

  return (
    <form style={inputStyle}>
      <FormControl>
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
});

export default Search;
