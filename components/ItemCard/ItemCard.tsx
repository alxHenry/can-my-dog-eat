import { FC } from "react";
import { ItemModel } from "../../types/ItemModel";
import { Box, Center, Text } from "@chakra-ui/react";

import CanEatText from "./CanEatText";
import styles from "./ItemCard.module.css";

interface ItemCardProps {
  item: ItemModel;
}

const ItemCard: FC<ItemCardProps> = ({ item: { name, canEat, description, imageLink } }) => {
  const imageElement = imageLink ? (
    <Center>
      <img className={styles.itemImage} src={imageLink}></img>
    </Center>
  ) : null;

  return (
    <article>
      <Center>
        <Box borderWidth="1px" borderColor="#e2e8ef" borderRadius="8px" padding="20px" marginX="8px">
          <Center>
            <h2 className={styles.itemHeader}>Can dogs eat {name}?</h2>
          </Center>
          {imageElement}
          <Center>
            <CanEatText canEat={canEat} />
          </Center>
          <Text>{description}</Text>
        </Box>
      </Center>
    </article>
  );
};

export default ItemCard;
