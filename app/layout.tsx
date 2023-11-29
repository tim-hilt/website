import { Open_Sans } from "next/font/google";
import Link from "next/link";
import type { PropsWithChildren } from "react";
import "./globals.css";

export const metadata = {
  title: "Website",
  description: "My personal website",
};

const font = Open_Sans({
  subsets: ["latin"],
  display: "swap",
});

function NavBar() {
  return (
    <nav className="flex p-8 text-xl">
      <Link href="/" className="grow font-semibold">
        Tim Hilt
      </Link>
      <div className="space-x-5 font-light">
        <Link href="/blog">Blog</Link>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="flex justify-center p-8 text-slate-500 dark:text-slate-200">
      {/* TODO: Add other socials here */}
      {/* TODO: Which icons could I use for that? */}
      <Link href="mailto:timhilt@live.de">Write Mail</Link>
    </footer>
  );
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className={`${font.className}`}>
      <body className="flex min-h-screen flex-col dark:bg-black dark:text-slate-50">
        <header className="">
          <NavBar />
        </header>
        <main className="grow p-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
