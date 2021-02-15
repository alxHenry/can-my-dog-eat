import { FC } from "react";
import Link from "next/link";
import { HStack } from "@chakra-ui/react";

import styles from "./SiteHeader.module.css";
import { getHomeUrl } from "../../util/urls";
import ItemSearchInput from "../ItemSearchInput";

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
          <ItemSearchInput />
        </HStack>
      </header>
      <div className={styles.headerSpacer} />
    </>
  );
};

export default SiteHeader;
