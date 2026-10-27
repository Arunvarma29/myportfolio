import Link from "next/link";
import React from "react";

//Components
import Nav from "./Nav";
import { Button } from "./ui/button";
import MobileNaV from "./MobileNav";

const Header = () => {
  return (
    <header className="py-8 xl:py-12 ">
      <div className="container mx-auto flex justify-between items-center">
        {/* logo */}
        <Link href={"/"}>
          <h1 className="text-5xl font-bold dark:text-white">
            &lt;
            <span className="text-[yellow] inline-flex h-9 w-9 rounded-full items-center justify-center bg-green-700 leading-none">
             .
            </span>
            /
            <span className="text-[yellow] inline-flex h-9 w-9 rounded-full items-center justify-center bg-green-700 leading-none">.</span>
            &gt;
          </h1>
        </Link>

        <div className="hidden xl:flex items-center gap-8">
          <Nav />
          <Link href={"/contact"}>
            <Button className=" bg-green-700 text-white hover:bg-green-500">
              Hire me{" "}
            </Button>
          </Link>
        </div>

        {/* Mobile view */}
        <div className="xl:hidden">
          <MobileNaV />
        </div>
      </div>
    </header>
  );
};

export default Header;
