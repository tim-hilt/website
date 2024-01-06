"use client";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();
  return (
    <NavigationMenu.Root className="px-4 pb-4 pt-4 text-xl md:px-8 md:pt-8">
      <NavigationMenu.List className="flex">
        <NavigationMenu.Item className="grow">
          <div className="flex w-20 font-semibold transition duration-100 hover:scale-105">
            <Link href="/" legacyBehavior passHref>
              <NavigationMenu.Link active={pathname === "/"}>
                Tim Hilt
              </NavigationMenu.Link>
            </Link>
          </div>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <div
            className={
              "flex w-16 justify-center transition duration-100 hover:scale-105"
            }
          >
            <Link href="/blog" legacyBehavior passHref>
              <NavigationMenu.Link
                active={pathname === "/blog"}
                className="font-light data-[active]:font-medium"
              >
                Blog
              </NavigationMenu.Link>
            </Link>
          </div>
        </NavigationMenu.Item>
        <NavigationMenu.Item className="relative flex justify-center">
          <NavigationMenu.Trigger
            className={`flex w-16 justify-center transition duration-100 hover:scale-105 data-[state=open]:scale-105 ${
              pathname.startsWith("/tools") ? "font-medium" : "font-light"
            }`}
          >
            Tools
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="data-[state=open]:animate-fadeIn data-[state=closed]:animate-fadeOut absolute mt-2 translate-y-1/2 whitespace-nowrap rounded-md border border-black bg-white dark:border-white dark:bg-black">
            <ul className="p-4 text-base">
              <li>
                <Link href="/tools/collaborative-chart" legacyBehavior passHref>
                  <NavigationMenu.Link
                    active={pathname === "/tools/collaborative-chart"}
                    className="flex font-light transition duration-100 hover:scale-105 data-[active]:font-medium"
                  >
                    Collaborative Chart
                  </NavigationMenu.Link>
                </Link>
              </li>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <div
            className={
              "flex w-16 justify-center transition duration-100 hover:scale-105"
            }
          >
            <Link href="/about" legacyBehavior passHref>
              <NavigationMenu.Link
                active={pathname === "/about"}
                className="font-light data-[active]:font-medium"
              >
                About
              </NavigationMenu.Link>
            </Link>
          </div>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}
