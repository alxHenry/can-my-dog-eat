import type { NextApiRequest, NextApiResponse } from "next";
import { getMatchingItemNames } from "../../db/getMatchingItemNames";

const search = async (req: NextApiRequest, res: NextApiResponse) => {
  let { searchText = "" } = req.query;

  if (!searchText) {
    res.status(400).send("Missing query text");
    return;
  }

  if (Array.isArray(searchText)) {
    searchText = searchText[0];
  }

  const matches = await getMatchingItemNames(searchText);
  res.status(200).json(matches);
};

export default search;
