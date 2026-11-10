import Link from "next/link";
import React from "react";

//Components
import Nav from "./Nav";
import MobileNaV from "./MobileNav";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <header className="py-8 xl:py-12 ">
      <div className="container mx-auto grid grid-cols-[1fr_auto_1fr] items-center px-3">
        {/* logo */}
        <Link href={"/"} className="justify-self-start">
          <h1 className="text-2xl font-bold text-foreground sm:text-5xl">
            &lt;
            <span className="inline-flex h-5 w-5 rounded-full items-center justify-center bg-accent text-accent-foreground leading-none sm:h-9 sm:w-9">
             .
            </span>
            /
            <span className="inline-flex h-5 w-5 rounded-full items-center justify-center bg-accent text-accent-foreground leading-none sm:h-9 sm:w-9">.</span>
            &gt;
          </h1>
        </Link>

        <ThemeToggle />

        <div className="flex items-center justify-self-end">
          <div className="hidden xl:flex items-center gap-8">
            <Nav />
          </div>

          {/* Mobile view */}
          <div className="xl:hidden">
            <MobileNaV />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
