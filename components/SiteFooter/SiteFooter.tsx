import { FC } from "react";
import Link from "next/link";

const SiteFooter: FC = () => {
  return (
    <footer>
      <section id="copyright">
        <ul>
          <li>
            <Link href="/credits">
              <a>Credits</a>
            </Link>
          </li>
        </ul>
      </section>
    </footer>
  );
};

export default SiteFooter;
