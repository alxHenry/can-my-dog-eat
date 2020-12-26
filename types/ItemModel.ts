import { ObjectId } from "mongodb";

export enum CanEat {
  Yes = "yes",
  No = "no",
  InModeration = "inModeration",
}

export enum ItemCategory {
  Vegetable = "vegetable",
  Sweets = "sweets",
}

export interface RawItemDocument {
  readonly _id: ObjectId;
  readonly name: string;
  readonly description: string;
  readonly canEat: CanEat;
  readonly category: ItemCategory;
  readonly imageLink?: string;
}

export interface ItemModel {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly canEat: CanEat;
  readonly category: ItemCategory;
  readonly imageLink?: string;
}
