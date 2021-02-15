import Link from "next/link";
import { List, ListItem, Text } from "@chakra-ui/react";
import { FC } from "react";
import { ItemModel } from "../../types/ItemModel";

import styles from "./MatchList.module.css";
import { getItemUrl } from "../../util/urls";

interface MatchesListProps {
  readonly matches: ItemModel[];
}

const MatchesList: FC<MatchesListProps> = ({ matches }) => {
  const matchesListItems = matches.map((match) => (
    <Link key={match.id} href={getItemUrl(match)}>
      <ListItem className={styles.matchListItem}>
        <Text fontSize="1.5rem">{match.name}</Text>
      </ListItem>
    </Link>
  ));

  return (
    <List backgroundColor="white" borderColor="#f2f2f2" borderWidth="1px" borderTop="none">
      {matchesListItems}
    </List>
  );
};

export default MatchesList;
