import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { ItemModel, RawItemDocument } from "../types/ItemModel";
import { connectToDatabase } from "../util/mongodb";
import { FC } from "react";

interface HomeProps {
  readonly recentItems: ItemModel[];
}

const Home: FC<HomeProps> = ({ recentItems }) => {
  const recentItemsList = recentItems.map(({ id, name, description, canEat }) => (
    <section key={id}>
      <h3>{name}</h3>
      <p>Can Eat?: {canEat}</p>
      <p>Description: {description}</p>
      <Link href={`https://candogseat.me/items/${id}`}>
        <a>View page</a>
      </Link>
    </section>
  ));

  return (
    <div>
      <Head>
        <title>Can Dogs Eat?</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="Description" content="Help dog owners decide if their dog can eat a food." />
      </Head>

      <main>
        <article>
          <h2>Recent Items</h2>
          {recentItemsList}
        </article>
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { db } = await connectToDatabase();
  const recentItems: RawItemDocument[] = await db
    .collection("items")
    .find({})
    .limit(10)
    .toArray();

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
