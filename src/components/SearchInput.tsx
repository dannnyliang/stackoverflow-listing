import {
  Box,
  Input,
  InputGroup,
  InputProps,
  InputRightAddon,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useState } from "react";

import { useAppDispatch } from "../hooks";
import { fetchTagStart } from "../redux/reducer/tag";

const StickyWrapper = styled(Box)`
  position: sticky;
  top: 0;
  z-index: 1;
`;

function SearchInput() {
  const [value, setValue] = useState<string>();
  const dispatch = useAppDispatch();

  const handleChange: InputProps["onChange"] = (e) => {
    const value = e.target.value;
    setValue(value);
    dispatch(fetchTagStart({ inname: value }));
  };

  return (
    <StickyWrapper p={4} boxShadow="base" bgColor="white">
      <InputGroup>
        <Input
          value={value}
          placeholder="Input to search tag"
          onChange={handleChange}
        />
        <InputRightAddon children="Search" />
      </InputGroup>
    </StickyWrapper>
  );
}

export default SearchInput;
