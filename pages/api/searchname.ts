import type { NextApiRequest, NextApiResponse } from "next";
import { getMatchingItemNames } from "../../db/getMatchingItemNames";
import { processItem } from "../../util/process";

const search = async (req: NextApiRequest, res: NextApiResponse) => {
  let { searchText = "" } = req.query;

  if (!searchText) {
    res.status(400).send("Missing query text");
    return;
  }

  if (Array.isArray(searchText)) {
    searchText = searchText[0];
  }

  const rawMatches = await getMatchingItemNames(searchText);
  const processedMatches = rawMatches.map(processItem);
  res.status(200).json(processedMatches);
};

export default search;
