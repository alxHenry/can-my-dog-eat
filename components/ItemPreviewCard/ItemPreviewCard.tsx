import { FC } from "react";
import { ItemModel } from "../../types/ItemModel";
import { Box, Container, Grid, GridItem, Text } from "@chakra-ui/react";
import Link from "next/link";

import styles from "./ItemPreviewCard.module.css";
import { canEatEnumToText, canEatEnumToTextColor } from "../../util/canEat";
import { getItemUrl } from "../../util/urls";

interface ItemPreviewCardProps {
  item: ItemModel;
}

const capitalizeFirstLetter = (str: string) => str[0].toUpperCase() + str.substring(1);

const ItemPreviewCard: FC<ItemPreviewCardProps> = ({ item }) => {
  const { canEat, description, name, imageLink } = item;

  return (
    <Link href={getItemUrl(item)}>
      <Box borderWidth="1px" borderColor="#e2e8ef" borderRadius="8px" cursor="pointer">
        <Grid h="140px" templateRows="repeat(2, 1fr)" templateColumns="repeat(5, 1fr)" gap={4}>
          <GridItem rowSpan={2} colSpan={1}>
            <img className={styles.cardThumbnail} src={imageLink} alt={name} />
          </GridItem>
          <GridItem colSpan={4}>
            <Text fontWeight="bold">{capitalizeFirstLetter(name)}</Text>
            <Text fontWeight="bold">
              Can eat?:{" "}
              <Text as="span" fontWeight="normal" display="inline" color={canEatEnumToTextColor(canEat)}>
                {canEatEnumToText(canEat)}
              </Text>
            </Text>
          </GridItem>
          <GridItem colSpan={4}>
            <Text lineHeight="24px" height="48px" overflow="hidden">
              {description}
            </Text>
          </GridItem>
        </Grid>
      </Box>
    </Link>
  );
};

export default ItemPreviewCard;
