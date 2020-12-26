import { FC } from "react";
import { CanEat } from "../../types/ItemModel";
import { Text } from "@chakra-ui/react";

import styles from "./CanEatText.module.css";
import { canEatEnumToText, canEatEnumToTextColor } from "../../util/canEat";

interface CanEatTextProps {
  readonly canEat: CanEat;
}

const CanEatText: FC<CanEatTextProps> = ({ canEat }) => {
  const canEatText = canEatEnumToText(canEat);
  const canEatTextColor = canEatEnumToTextColor(canEat);

  return (
    <Text className={styles.canEatText} color={canEatTextColor}>
      {canEatText}
    </Text>
  );
};

export default CanEatText;
