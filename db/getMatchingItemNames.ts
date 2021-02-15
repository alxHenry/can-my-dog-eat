import { RawItemDocument } from "../types/ItemModel";
import { connectToDatabase } from "../util/mongodb";

export const getMatchingItemNames = async (queryText: string): Promise<RawItemDocument[]> => {
  const { db } = await connectToDatabase();

  return db
    .collection("items")
    .aggregate([
      {
        $search: {
          index: "name search",
          autocomplete: {
            query: "broc",
            path: "name",
            fuzzy: {
              maxEdits: 2,
              prefixLength: 2,
            },
          },
        },
      },
      {
        $limit: 5,
      },
    ])
    .toArray();
};
