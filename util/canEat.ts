import { CanEat } from "../types/ItemModel";

export const canEatEnumToText = (canEat: CanEat): string => {
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

export const canEatEnumToTextColor = (canEat: CanEat): string => {
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
