import { ItemModel, RawItemDocument } from "../types/ItemModel";

export const processItem = (item: RawItemDocument): ItemModel => {
  const { _id, ...rest } = item;

  return {
    id: _id.toHexString(),
    ...rest,
  };
};
