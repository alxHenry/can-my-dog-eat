import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { FC } from "react";
import { connectToDatabase, getAllItems } from "../../util/mongodb";
import { ObjectId } from "mongodb";
import { ItemModel, RawItemDocument } from "../../types/ItemModel";

interface ItemProps {
  item: ItemModel;
}

const Item: FC<ItemProps> = ({ item: { id, name, description, canEat } }) => {
  return (
    <>
      <Head>
        <title>Can Dogs Eat - {name}</title>
        <meta name="Description" content={`Can dogs eat ${name}?`}></meta>
      </Head>
      <main>
        <p>ID: {id}</p>
        <p>Name: {name}</p>
        <p>Can Eat: {canEat}</p>
        <p>Description: {description}</p>
      </main>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const items = await getAllItems();
  const paths = items.map((item: any) => `/items/${item._id.toString()}`);

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

  const processed: ItemModel = {
    id: item._id.toHexString(),
    name: item.name,
    description: item.description,
    canEat: item.canEat,
  };

  return {
    props: {
      item: processed,
    },
  };
};

export default Item;
