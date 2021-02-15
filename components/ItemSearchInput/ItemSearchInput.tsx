import { FC, useState } from "react";
import { IconButton, Input } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useNameSearch } from "./useNameSearch";

const ItemSearchInput: FC = () => {
  const [queryText, setQueryText] = useState("");
  const [inputHidden, setInputHidden] = useState(true);
  const inputDisplay = inputHidden ? "none" : "initial";

  const toggleInput = () => {
    setInputHidden((hidden) => !hidden);
  };
  const onInputChange = (evt: React.FormEvent<HTMLInputElement>) => {
    setQueryText(evt.currentTarget.value);
  };

  const matches = useNameSearch(queryText);

  return (
    <div className="row">
      <IconButton
        className="col"
        aria-label="Search items"
        background="none"
        icon={<SearchIcon boxSize="24px" color="white" />}
        onClick={toggleInput}
      />
      <Input
        className="col"
        onChange={onInputChange}
        color="white"
        maxWidth="30ch"
        borderRadius={0}
        borderTop="none"
        borderX="none"
        borderColor="#e6e6e6"
        focusBorderColor="#e6e6e6"
        fontSize="1.5em"
        display={inputDisplay}
        style={{ boxShadow: "none" }}
      />
    </div>
  );
};

export default ItemSearchInput;
