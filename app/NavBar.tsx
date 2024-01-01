"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavBar() {
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
        {/** TODO: Add tools / projects / explorations */}
      </div>
    </nav>
  );
}
