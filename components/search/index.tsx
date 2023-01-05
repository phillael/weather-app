import { FormControl } from "@chakra-ui/react";
import React, { FC, useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiOptions, GEO_API_URL } from "../../api/weather/weather-api";
import { SearchProps } from "./search.props";
import { observer } from "mobx-react-lite";

const Search: FC<SearchProps> = observer(({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const formStyle = {
    width: "80%",
    "text-align": "center",
    color: "black",
    marginBottom: "20px",
  };

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

  return (
    <form style={formStyle}>
      <FormControl>
        <AsyncPaginate
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              borderRadius: "12px",
              padding: "4px",
            }),
          }}
          placeholder="Search for a city!"
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
