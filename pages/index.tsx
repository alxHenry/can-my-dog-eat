import { GetStaticProps } from "next";
import Head from "next/head";
import { ItemModel, RawItemDocument } from "../types/ItemModel";
import { connectToDatabase } from "../util/mongodb";
import { FC } from "react";
import { Box, Center, VStack } from "@chakra-ui/react";
import ItemPreviewCard from "../components/ItemPreviewCard";
import { processItem } from "../util/process";

interface HomeProps {
  readonly recentItems: ItemModel[];
}

const Home: FC<HomeProps> = ({ recentItems }) => {
  const recentItemsList = recentItems.map((item) => (
    <section key={item.id}>
      <ItemPreviewCard item={item} />
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
          <Center>
            <Box>
              <h2>Recent Items</h2>
              <VStack spacing="8px" maxWidth="700px">
                {recentItemsList}
              </VStack>
            </Box>
          </Center>
        </article>
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { db } = await connectToDatabase();
  const recentItems: RawItemDocument[] = await db.collection("items").find({}).limit(10).toArray();

  const processed = recentItems.map(processItem);

  return {
    props: {
      recentItems: processed,
    },
  };
};

export default Home;
