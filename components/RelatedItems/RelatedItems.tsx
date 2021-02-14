import { FC } from "react";
import Link from "next/link";
import { ItemModel } from "../../types/ItemModel";
import { getItemUrl } from "../../util/urls";
import { Box, Heading, Link as UILink, List, ListItem, ListIcon } from "@chakra-ui/react";
import { LinkIcon } from "@chakra-ui/icons";

interface RelatedItemsProps {
  readonly relatedItems: ItemModel[];
}

const RelatedItems: FC<RelatedItemsProps> = ({ relatedItems }) => {
  const itemLinks = relatedItems.map((item) => (
    <Link href={getItemUrl(item)} key={item.id}>
      <ListItem>
        <ListIcon as={LinkIcon} color="#e4534e" />
        <UILink color="teal.500">{item.name}</UILink>
      </ListItem>
    </Link>
  ));

  return (
    <Box as="section" paddingX="3em">
      <Heading as="h3" size="md" color="#2c4e64" marginBottom="1em">
        Related Items
      </Heading>
      <List spacing={3}>{itemLinks}</List>
    </Box>
  );
};

export default RelatedItems;
