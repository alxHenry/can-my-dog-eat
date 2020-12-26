import { FC } from "react";
import { CanEat } from "../../types/ItemModel";
import { Text } from "@chakra-ui/react";

import styles from "./CanEatText.module.css";

const canEatEnumToText = (canEat: CanEat) => {
  switch (canEat) {
    case CanEat.Yes:
      return "Yes";
    case CanEat.No:
      return "No";
    case CanEat.InModeration:
      return "In Moderation";
    default:
      return "Not sure";
  }
};

const canEatEnumToTextColor = (canEat: CanEat) => {
  switch (canEat) {
    case CanEat.Yes:
      return "#00cc00";
    case CanEat.InModeration:
      return "#cc9900";
    case CanEat.No:
    default:
      return "#cc0000";
  }
};

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
