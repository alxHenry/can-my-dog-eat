import { SitemapStream, streamToPromise } from "sitemap";
import { Readable } from "stream";
import { getAllItems } from "./mongodb";
import * as fs from "fs";
import dotenv from "dotenv";
import { processItem } from "./process";
import { getHomeUrl, getItemUrl } from "./urls";

dotenv.config({ path: ".env.local" });

const getAllPaths = async () => {
  const items = await getAllItems();
  const processedItems = items.map(processItem);

  const paths = processedItems.map((item) => ({
    url: getItemUrl(item),
    changefreq: "weekly",
    priority: 0.5,
  }));

  const homePath = {
    url: getHomeUrl(),
    changefreq: "daily",
    priority: 0.8,
  };
  paths.unshift(homePath);

  return paths;
};

getAllPaths()
  .then((paths) => {
    const stream = new SitemapStream({ hostname: "https://candogsdine.com/" });

    return streamToPromise(Readable.from(paths).pipe(stream));
  })
  .then((data) => {
    const xml = data.toString();
    const filePath = `${__dirname}/../public/sitemap.xml`;

    fs.writeFileSync(filePath, xml);

    process.exit();
  });
