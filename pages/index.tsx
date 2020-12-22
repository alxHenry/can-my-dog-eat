import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { ItemModel, RawItemModel } from "../types/ItemModel";
import { connectToDatabase } from "../util/mongodb";
import { FC } from "react";

interface HomeProps {
  readonly recentItems: ItemModel[];
}

const Home: FC<HomeProps> = ({ recentItems }) => {
  const recentItemsList = recentItems.map(({ id, name, description, canEat }) => (
    <div key={id}>
      <p>Name: {name}</p>
      <p>Can Eat?: {canEat}</p>
      <p>Description: {description}</p>
      <Link href={`https://candogseat.me/items/${id}`}>
        <a>{name}</a>
      </Link>
    </div>
  ));

  return (
    <div className={styles.container}>
      <Head>
        <title>Can Dogs Eat?</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h2>Recent Items</h2>
        {recentItemsList}
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { db } = await connectToDatabase();
  const recentItems: RawItemModel[] = await db.collection("items").find({}).limit(10).toArray();
  const processed = recentItems.map<ItemModel>((item) => ({
    id: item._id.toHexString(),
    name: item.name,
    canEat: item.canEat,
    description: item.description,
  }));

  return {
    props: {
      recentItems: processed,
    },
  };
};

export default Home;
