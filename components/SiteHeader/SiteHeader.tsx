import { FC } from "react";
import Link from "next/link";

const SiteHeader: FC = () => {
  return (
    <header>
      <h1>Can Dogs Dine?</h1>
      <nav>
        <h1 className="SEO-safe-hidden">Navigation</h1>
        <Link href="/">
          <img height="80" width="80" src="/header-logo.min.svg" alt="Logo" aria-label="Navigate home" />
        </Link>
      </nav>
    </header>
  );
};

export default SiteHeader;
