import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import React, { FC } from "react";
import { connectToDatabase, getAllItems } from "../../../util/mongodb";
import { ObjectId } from "mongodb";
import { ItemModel, RawItemDocument } from "../../../types/ItemModel";
import ItemCard from "../../../components/ItemCard/ItemCard";
import { getItemUrl } from "../../../util/urls";
import { processItem } from "../../../util/process";

interface ItemProps {
  item: ItemModel;
}

const Item: FC<ItemProps> = ({ item }) => {
  const { name } = item;

  return (
    <>
      <Head>
        <title>Can dogs eat {name}?</title>
        <meta name="Description" content={`Can dogs eat ${name}?`}></meta>
      </Head>
      <main>
        <ItemCard item={item} />
      </main>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const items = await getAllItems();
  const processedItems = items.map(processItem);
  const paths = processedItems.map(getItemUrl);

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params?.id) {
    return { notFound: true };
  }

  const { db } = await connectToDatabase();
  const item: RawItemDocument | null = await db.collection("items").findOne({ _id: new ObjectId(params.id as string) });

  if (!item) {
    return { notFound: true };
  }

  return {
    props: {
      item: processItem(item),
    },
  };
};

export default Item;
