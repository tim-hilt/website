"use client";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function LegacyNavBar() {
  const pathname = usePathname();
  const entries = [
    {
      path: "/blog",
      title: "Blog",
    },
    {
      path: "/about",
      title: "About",
    },
  ];

  return (
    <nav className="flex pt-8 md:px-8 px-4 pb-4 text-xl">
      <div className="grow">
        <div className="flex w-28">
          <Link
            href="/"
            className="font-semibold transition duration-100 hover:scale-105"
          >
            Tim Hilt
          </Link>
        </div>
      </div>
      <div className="flex">
        {entries.map(({ path, title }) => {
          const isPathname = path === pathname;
          return (
            <div
              key={path}
              className={`flex w-[4em] justify-center transition duration-100 hover:scale-105 ${
                isPathname ? "font-medium" : "font-light"
              }`}
            >
              <Link href={path}>{title}</Link>
            </div>
          );
        })}
        <div
          key="tools"
          className="flex w-[4em] justify-center transition duration-100 hover:scale-105 font-light"
        >
          <Link href={"/tools"}>Tools</Link>
        </div>
      </div>
    </nav>
  );
}

export default function NavBar() {
  const pathname = usePathname();
  return (
    <NavigationMenu.Root className="pt-8 md:px-8 px-4 pb-4 text-xl">
      <NavigationMenu.List className="flex">
        <NavigationMenu.Item className="grow">
          <div className="flex">
            <Link
              href="/"
              className="font-semibold transition duration-100 hover:scale-105"
            >
              Tim Hilt
            </Link>
          </div>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <div
            className={`flex w-16 transition duration-100 hover:scale-105 ${
              pathname === "/blog" ? "font-medium" : "font-light"
            }`}
          >
            <Link href="/blog">Blog</Link>
          </div>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <div
            className={`flex w-16 transition duration-100 hover:scale-105 ${
              pathname === "/tools" ? "font-medium" : "font-light"
            }`}
          >
            <Link href="/tools">Tools</Link>
          </div>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <div
            className={`flex w-16 transition duration-100 hover:scale-105 ${
              pathname === "/about" ? "font-medium" : "font-light"
            }`}
          >
            <Link href="/about">About</Link>
          </div>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}
