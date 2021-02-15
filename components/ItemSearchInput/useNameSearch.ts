import { ItemModel, RawItemDocument } from "../../types/ItemModel";
import debounce from "lodash.debounce";
import { useEffect, useState } from "react";
import { processItem } from "../../util/process";

const queryCache = new Map<string, ItemModel[]>();
const addToCache = (queryText: string, matches: ItemModel[]) => {
  queryCache.set(queryText, matches);
};

const getMatches = async (queryText: string, onSuccess: (matches: ItemModel[]) => void) => {
  const queryUrl = `/api/searchname?searchText=${queryText}`;

  let newMatches: ItemModel[] = [];
  try {
    const searchResponse = await fetch(queryUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!searchResponse.ok) {
      throw new Error("Response is not ok");
    }
    newMatches = await searchResponse.json();
  } catch (err) {}

  addToCache(queryText, newMatches);
  onSuccess(newMatches);
};
const debouncedGetMatches = debounce(getMatches, 300);

export const useNameSearch = (queryText: string): ItemModel[] => {
  const [matches, setMatches] = useState<ItemModel[]>([]);

  useEffect(() => {
    if (!queryText) {
      setMatches([]);
      return;
    }

    if (queryCache.has(queryText)) {
      setMatches(queryCache.get(queryText)!);
      return;
    }

    debouncedGetMatches(queryText, setMatches);
  }, [queryText]);

  return matches;
};
