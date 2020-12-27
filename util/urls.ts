import { ItemModel } from "../types/ItemModel";

const nameToUrlSafeName = (name: ItemModel["name"]) => {
  const result = name.split(" ").join("-");
  return encodeURI(result);
};

export const getHomeUrl = (): string => "/";
export const getCreditsUrl = (): string => "/credits";
export const getItemUrl = (item: ItemModel): string => `/items/${nameToUrlSafeName(item.name)}/${item.id}`;
