import { ObjectId } from "mongodb";

enum CanEat {
  Yes = "Yes",
  No = "No",
  InModeration = "InModeration",
}

export interface RawItemModel {
  readonly _id: ObjectId;
  readonly name: string;
  readonly description: string;
  readonly canEat: CanEat;
}

export interface ItemModel {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly canEat: CanEat;
}
