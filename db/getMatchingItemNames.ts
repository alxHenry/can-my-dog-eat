import { connectToDatabase } from "../util/mongodb";

export const getMatchingItemNames = async (queryText: string) => {
  const { db } = await connectToDatabase();

  return db
    .collection("items")
    .find({ $text: { $search: queryText } })
    .limit(5)
    .toArray();
};
