import { FC } from "react";
import Link from "next/link";

const SiteFooter: FC = () => {
  return (
    <footer>
      <h6 className="SEO-safe-hidden">Footer</h6>
      <section id="copyright">
        <h6 className="SEO-safe-hidden">Attribution and Copyright</h6>
        <Link href="/credits">
          <a>Credits</a>
        </Link>
      </section>
    </footer>
  );
};

export default SiteFooter;
