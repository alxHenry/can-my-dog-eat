import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { FC } from "react";
import { connectToDatabase } from "../../util/mongodb";
import { ObjectId } from "mongodb";

interface ItemProps {
  id: string;
  name: string;
  description: string;
}

const Item: FC<ItemProps> = ({ id, name, description }) => {
  return (
    <>
      <p>ID: {id}</p>
      <p>Name: {name}</p>
      <p>description: {description}</p>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { db } = await connectToDatabase();
  const items = await db.collection("items").find({}).toArray();
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
  const item = await db.collection("items").findOne({ _id: new ObjectId(params.id as string) });

  return {
    props: {
      id: item._id.toString(),
      name: item.name,
      description: item.description,
    },
  };
};

export default Item;
