import { FC } from "react";
import Link from "next/link";
import { HStack } from "@chakra-ui/react";

import styles from "./SiteHeader.module.css";
import { getHomeUrl } from "../../util/urls";

const SiteHeader: FC = () => {
  return (
    <>
      <header className={styles.headerBar}>
        <HStack spacing="16px" padding="8px">
          <nav>
            <h2 className="SEO-safe-hidden">Navigation</h2>
            <Link href={getHomeUrl()}>
              <img
                className={styles.headerLogo}
                height="48px"
                width="48px"
                src="/header-logo.min.svg"
                alt="Logo"
                aria-label="Navigate home"
              />
            </Link>
          </nav>
          <Link href={getHomeUrl()}>
            <h1 className={styles.headerTitle}>Can Dogs Dine?</h1>
          </Link>
        </HStack>
      </header>
      <div className={styles.headerSpacer} />
    </>
  );
};

export default SiteHeader;
