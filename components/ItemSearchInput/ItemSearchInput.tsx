import React, { FC, useState } from "react";
import { Box, IconButton, Input } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useNameSearch } from "./useNameSearch";
import MatchesList from "./MatchList";

const ItemSearchInput: FC = () => {
  const [queryText, setQueryText] = useState("");
  const [inputHidden, setInputHidden] = useState(true);
  const inputDisplay = inputHidden ? "none" : "initial";

  const toggleInput = () => {
    setInputHidden((hidden) => !hidden);
  };
  const hideInput = () => {
    setQueryText("");
    setInputHidden(true);
  };
  const onInputChange = (evt: React.FormEvent<HTMLInputElement>) => {
    setQueryText(evt.currentTarget.value);
  };

  const matches = useNameSearch(queryText);

  return (
    <Box className="row">
      <IconButton
        className="col"
        aria-label="Search items"
        background="none"
        icon={<SearchIcon boxSize="24px" color="white" />}
        onClick={toggleInput}
      />
      <Box position="relative" className="col" display={inputDisplay}>
        <Input
          value={queryText}
          onChange={onInputChange}
          color="white"
          maxWidth="30ch"
          borderRadius={0}
          borderTop="none"
          borderX="none"
          borderColor="#f2f2f2"
          focusBorderColor="#f2f2f2"
          fontSize="1.5rem"
          style={{ boxShadow: "none" }}
        />
        <Box position="absolute" top="100%" left={0} right={0}>
          <MatchesList matches={matches} onClick={hideInput} />
        </Box>
      </Box>
    </Box>
  );
};

export default ItemSearchInput;
