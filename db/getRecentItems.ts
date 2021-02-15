import { ItemModel, RawItemDocument } from "../types/ItemModel";
import { connectToDatabase } from "../util/mongodb";

export const getRecentItems = async (): Promise<RawItemDocument[]> => {
  const { db } = await connectToDatabase();
  return db.collection("items").find({}).limit(10).toArray();
};
