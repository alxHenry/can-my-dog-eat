import { FC } from "react";
import Link from "next/link";
import { Center, Link as UILink } from "@chakra-ui/react";

import styles from "./SiteFooter.module.css";
import { getCreditsUrl } from "../../util/urls";

const SiteFooter: FC = () => {
  return (
    <div className={styles.footerBar}>
      <h4 className="SEO-safe-hidden">Footer</h4>
      <section id="copyright">
        <h5 className="SEO-safe-hidden">Attribution and Copyright</h5>
        <Center>
          <Link href={getCreditsUrl()}>
            <UILink>Credits</UILink>
          </Link>
        </Center>
      </section>
    </div>
  );
};

export default SiteFooter;
