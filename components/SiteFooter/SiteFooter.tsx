import { FC } from "react";
import Link from "next/link";

const SiteFooter: FC = () => {
  return (
    <footer>
      <h4 className="SEO-safe-hidden">Footer</h4>
      <section id="copyright">
        <h5 className="SEO-safe-hidden">Attribution and Copyright</h5>
        <Link href="/credits">
          <a>Credits</a>
        </Link>
      </section>
    </footer>
  );
};

export default SiteFooter;
