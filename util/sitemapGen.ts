import { SitemapStream, streamToPromise } from "sitemap";
import { Readable } from "stream";
import { getAllItems } from "./mongodb";
import * as fs from "fs";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const getAllPaths = async () => {
  const items = await getAllItems();

  const paths = items.map((item) => ({
    url: `/items/${item._id.toHexString()}`,
    changefreq: "weekly",
    priority: 0.5,
  }));

  const homePath = {
    url: "/",
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
    console.log(filePath);

    fs.writeFileSync(filePath, xml);

    process.exit();
  });
