import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import React, { FC } from "react";
import { connectToDatabase, getAllItems } from "../../util/mongodb";
import { ObjectId } from "mongodb";
import { ItemModel, RawItemDocument } from "../../types/ItemModel";
import { Box, Center, Text } from "@chakra-ui/react";
import CanEatText from "./CanEatText";

import styles from "./[id].module.css";

interface ItemProps {
  item: ItemModel;
}

const captializeFirstLetter = (str: string) => {
  return str[0].toUpperCase() + str.substring(1);
};

const Item: FC<ItemProps> = ({ item: { name, description, canEat, imageLink } }) => {
  const capitalizedName = captializeFirstLetter(name);

  const imageElement = (
    <Center>
      <img className={styles.itemImage} src={imageLink}></img>
    </Center>
  );

  return (
    <>
      <Head>
        <title>Can Dogs Eat {capitalizedName}?</title>
        <meta name="Description" content={`Can dogs eat ${name}?`}></meta>
      </Head>
      <main>
        <article>
          <Center>
            <Box borderWidth="1px" borderColor="#e2e8ef" borderRadius="8px" padding="20px" marginX="4px">
              <Center>
                <h2 className={styles.itemHeader}>Can Dogs Eat {capitalizedName}?</h2>
              </Center>
              {imageElement}
              <Center>
                <CanEatText canEat={canEat} />
              </Center>
              <Text>{description}</Text>
            </Box>
          </Center>
        </article>
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
    category: item.category,
    imageLink: item.imageLink,
  };

  return {
    props: {
      item: processed,
    },
  };
};

export default Item;
