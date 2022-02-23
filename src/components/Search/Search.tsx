import React, { useState, FC } from "react";
import { useDispatch } from "react-redux";
import usePlacesAutocomplete from "use-places-autocomplete";
import Geocode from "react-geocode";
import { Select } from "antd";
import { createMarker, moveToCenter } from "../../services/actions/index";
import { INewItem } from "../../interfaces/interface-item";
import "./Search.css";

const Search: FC = () => {
  const [place, setPlace] = useState<string>();
  const dispatch = useDispatch();
  const {
    ready,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {},
    debounce: 300,
  });
  Geocode.setLanguage("en");

  const handleChange = (placeValue: string) => {
    if (placeValue) {
      setPlace(placeValue);
      handleSelect(placeValue);
    } else {
      setPlace(undefined);
    }
  };

  const handleSubmitItem = (item: INewItem) => {
    dispatch(createMarker(item.id, item.address, item.position));
  };

  const handleSearch = (selectedValue: string) => {
    setValue(selectedValue);
  };

  const handleSelect = (description: string) => {
    setValue(description, false);
    clearSuggestions();
    Geocode.fromAddress(description)
      .then((response) => {
        const { lat, lng } = response.results[0].geometry.location;
        const address = response.results[0].formatted_address;
        const id = response.results[0].place_id;
        console.log("📍 Coordinates: ", {
          lat,
          lng,
        });
        dispatch(moveToCenter(lat, lng));
        handleSubmitItem({
          id: id,
          address: address,
          position: { lat, lng },
        });
      })
      .catch((error) => {
        console.log("😱 Error: ", error);
      });
  };

  return (
      <Select
        showSearch
        allowClear
        placeholder='Новая точка маршрута'
        value={place}
        style={{ width: "100%", marginBottom: "30px" }}
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        onSearch={handleSearch}
        onChange={handleChange}
        notFoundContent={
          status === "ZERO_RESULTS" ? <h3>Ничего не найдено</h3> : null
        }
        className='search__input'
        disabled={!ready}
      >
        {status === "OK" &&
          data.map((suggestion) => {
            const {
              place_id,
              description,
              structured_formatting: { main_text, secondary_text },
            } = suggestion;

            return (
              <Select.Option
                key={place_id}
                value={description}
                label={main_text}
                title={main_text}
              >
                <b>{main_text}</b> <small>{secondary_text}</small>
              </Select.Option>
            );
          })}
      </Select>
  );
};
export { Search };
