import { FC } from "react";
import Link from "next/link";
import { Center, Link as UILink } from "@chakra-ui/react";

import styles from "./SiteFooter.module.css";

const SiteFooter: FC = () => {
  return (
    <div className={styles.footerBar}>
      <h4 className="SEO-safe-hidden">Footer</h4>
      <section id="copyright">
        <h5 className="SEO-safe-hidden">Attribution and Copyright</h5>
        <Center>
          <Link href="/credits">
            <UILink>Credits</UILink>
          </Link>
        </Center>
      </section>
    </div>
  );
};

export default SiteFooter;
