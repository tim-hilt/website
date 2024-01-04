"use client";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();
  return (
    <NavigationMenu.Root className="pt-4 md:pt-8 md:px-8 px-4 pb-4 text-xl">
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
                className="data-[active]:font-medium font-light"
              >
                Blog
              </NavigationMenu.Link>
            </Link>
          </div>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger>
            <div
              className={
                "flex justify-center w-16 transition duration-100 hover:scale-105"
              }
            >
              <Link href="/tools" legacyBehavior passHref>
                <NavigationMenu.Link
                  active={pathname === "/tools"}
                  className="data-[active]:font-medium font-light"
                >
                  Tools
                </NavigationMenu.Link>
              </Link>
            </div>
          </NavigationMenu.Trigger>
          {/** TODO: Add styling */}
          <NavigationMenu.Content>
            <ul>
              <li>
                <NavigationMenu.Link
                  active={pathname === "/tools/collaborative-chart"}
                  className="data-[active]:font-medium font-light"
                  asChild
                >
                  <Link
                    href="/tools/collaborative-chart"
                    legacyBehavior
                    passHref
                  >
                    <div>Collaborative Chart</div>
                  </Link>
                </NavigationMenu.Link>
              </li>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <div
            className={
              "flex w-16 transition justify-center duration-100 hover:scale-105"
            }
          >
            <Link href="/about" legacyBehavior passHref>
              <NavigationMenu.Link
                active={pathname === "/about"}
                className="data-[active]:font-medium font-light"
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
