import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { FC } from "react";
import { connectToDatabase } from "../../util/mongodb";

const Item: FC = () => {
  const router = useRouter();
  const { id } = router.query;

  return <p>Item: {id}</p>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { db } = await connectToDatabase();
  const items = await db.collection("items").find({}).toArray();

  const paths = items.map((item: any) => `/items/${item._id}`);
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return { props: {} };
};

export default Item;
