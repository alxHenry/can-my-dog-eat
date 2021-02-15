import React, { FC, useState } from "react";
import { Box, IconButton, Input, InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/react";
import { CloseIcon, SearchIcon } from "@chakra-ui/icons";
import { useNameSearch } from "./useNameSearch";
import MatchesList from "./MatchList";

const ItemSearchInput: FC = () => {
  const [queryText, setQueryText] = useState("");

  const onInputChange = (evt: React.FormEvent<HTMLInputElement>) => {
    setQueryText(evt.currentTarget.value);
  };
  const resetQuery = () => {
    setQueryText("");
  };

  const matches = useNameSearch(queryText);
  const inputRightElement =
    queryText.length > 0 ? <InputRightElement children={<CloseIcon color="white" />} onClick={resetQuery} /> : null;

  return (
    <Box position="relative">
      <InputGroup>
        <InputLeftElement color="white" pointerEvents="none" children={<SearchIcon boxSize="1.5rem" />} />
        <Input
          value={queryText}
          onChange={onInputChange}
          color="white"
          maxWidth="30ch"
          borderRadius={0}
          border="none"
          fontSize="1.5rem"
          style={{ boxShadow: "none" }}
        />
        {inputRightElement}
      </InputGroup>
      <Box position="absolute" top="100%" left={0} right={0}>
        <MatchesList matches={matches} onClick={resetQuery} />
      </Box>
    </Box>
  );
};

export default ItemSearchInput;
