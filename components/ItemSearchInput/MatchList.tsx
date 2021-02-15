import Link from "next/link";
import { Box, List, ListItem, Text } from "@chakra-ui/react";
import { FC } from "react";
import { ItemModel } from "../../types/ItemModel";

import styles from "./MatchList.module.css";
import { getItemUrl } from "../../util/urls";

interface MatchesListProps {
  readonly matches: ItemModel[];
  readonly onClick: () => void;
}

const MatchesList: FC<MatchesListProps> = ({ matches, onClick }) => {
  const matchesListItems = matches.map((match) => (
    <Link key={match.id} href={getItemUrl(match)}>
      <ListItem className={styles.matchListItem} onClick={onClick}>
        <Text fontSize="1.5rem">{match.name}</Text>
      </ListItem>
    </Link>
  ));

  return (
    <Box position="absolute" top="100%" left={0} right={0}>
      <List backgroundColor="white">{matchesListItems}</List>
    </Box>
  );
};

export default MatchesList;
