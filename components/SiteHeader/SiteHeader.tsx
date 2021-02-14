import { FC, useState } from "react";
import Link from "next/link";
import { HStack, IconButton, Input } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

import styles from "./SiteHeader.module.css";
import { getHomeUrl } from "../../util/urls";

const SiteHeader: FC = () => {
  const [inputHidden, setInputHidden] = useState(true);
  const inputDisplayClass = inputHidden ? styles.inputHidden : styles.inputShown;

  const toggleInput = () => {
    setInputHidden((hidden) => !hidden);
  };

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
          <IconButton
            aria-label="Search items"
            background="none"
            icon={<SearchIcon boxSize="24px" color="white" />}
            onClick={toggleInput}
          />
          <Input
            color="white"
            maxWidth="30ch"
            borderRadius={0}
            borderTop="none"
            borderX="none"
            borderColor="#e6e6e6"
            focusBorderColor="#e6e6e6"
            fontSize="1.5em"
            className={inputDisplayClass}
            style={{ boxShadow: "none" }}
          />
        </HStack>
      </header>
      <div className={styles.headerSpacer} />
    </>
  );
};

export default SiteHeader;
