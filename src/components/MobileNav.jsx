"use client";

import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {CiMenuFries} from "react-icons/ci"


const links = [
  {
    name: "home",
    path: '/'
  },
  {
    name: "services",
    path: '/services'
  },
  {
    name: "resume",
    path: '/resume'
  },
  {
    name: "work",
    path: '/work'
  },
  {
    name: "Hire Me",
    path: '/contact'
  },
]

const MobileNaV = () => {
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger className="flex justify-center items-center px-2">
      <CiMenuFries className="text-[32px] text-accent "/>
      </SheetTrigger>

      <SheetContent className="flex flex-col bg-card text-foreground">
        {/* logo */}
        <div className="mt-32 mb-40 text-center text-2xl">
          <Link href={"/"}>
         <h1 className="text-5xl font-bold text-foreground">
            &lt;
            <span className="text-accent-foreground inline-flex h-9 w-9 rounded-full items-center justify-center bg-accent leading-none">
             .
            </span>
            /
            <span className="text-accent-foreground inline-flex h-9 w-9 rounded-full items-center justify-center bg-accent leading-none">.</span>
            &gt;
          </h1>
          </Link>
        </div>

      {/* nav */}
      <nav className="flex flex-col justify-center items-center gap-8">
        {links.map((link,index)=>{
          return (
            <Link 
            href={link.path}
            key={index}
            className={`text-xl capitalize transition-colors hover:text-accent ${
              link.path === pathname
                ? "border-b-2 border-accent text-accent"
                : "text-foreground"
            }`}
            >
            {link.name}
            </Link>
          )
        })}
        
        </nav>

      </SheetContent>
    </Sheet>
  )
  
}

export default MobileNaV
