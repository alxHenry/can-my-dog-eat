import { FC } from "react";
import Link from "next/link";
import { ItemModel } from "../../types/ItemModel";
import { getItemUrl } from "../../util/urls";
import { Box, Center, Heading, Link as UILink, List, ListItem, ListIcon } from "@chakra-ui/react";
import { LinkIcon } from "@chakra-ui/icons";
import Card from "../Card";

interface RelatedItemsCardProps {
  readonly relatedItems: ItemModel[];
}

const RelatedItemsCard: FC<RelatedItemsCardProps> = ({ relatedItems }) => {
  const itemLinks = relatedItems.map((item) => (
    <Link href={getItemUrl(item)} key={item.id}>
      <ListItem>
        <ListIcon as={LinkIcon} color="#e4534e" />
        <UILink color="teal.500">{item.name}</UILink>
      </ListItem>
    </Link>
  ));

  return (
    <section>
      <Center>
        <Card>
          <Heading as="h3" size="md" color="#2c4e64">
            Related Items
          </Heading>
          <List spacing={3}>{itemLinks}</List>
        </Card>
      </Center>
    </section>
  );
};

export default RelatedItemsCard;
