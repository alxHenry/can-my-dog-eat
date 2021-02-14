import { connectToDatabase } from "../util/mongodb";

export const getRecentItems = async () => {
  const { db } = await connectToDatabase();
  return db.collection("items").find({}).limit(10).toArray();
};
