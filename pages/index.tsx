import { GetStaticProps } from "next";
import Head from "next/head";
import { ItemModel } from "../types/ItemModel";
import { FC } from "react";
import { Box, Center, Heading, VStack } from "@chakra-ui/react";
import ItemPreviewCard from "../components/ItemPreviewCard";
import { processItem } from "../util/process";
import styles from "./index.module.css";
import { getRecentItems } from "../db/getRecentItems";

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
            <Box marginX="8px">
              <Center>
                <Heading as="h2" className={styles.recentItemsHeader}>
                  Recent Items
                </Heading>
              </Center>
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
  const recentItems = await getRecentItems();
  const processed = recentItems.map(processItem);

  return {
    props: {
      recentItems: processed,
    },
  };
};

export default Home;
