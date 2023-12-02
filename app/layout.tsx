import { JetBrains_Mono, Open_Sans } from "next/font/google";
import Link from "next/link";
import type { PropsWithChildren } from "react";
import "./globals.css";

const font_sans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const font_mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

function NavBar() {
  return (
    <nav className="flex p-8 text-xl">
      <div className="grow">
        <div className="flex w-20 justify-center">
          <Link
            href="/"
            className="font-semibold transition duration-100 hover:scale-105"
          >
            Tim Hilt
          </Link>
        </div>
      </div>
      <div className="flex font-light">
        <div className="flex w-20 justify-center transition duration-100 hover:scale-105">
          <Link href="/blog">Blog</Link>
        </div>
        {/** TODO: Add tools / projects / explorations */}
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
    <html lang="en" className={`${font_sans.variable} ${font_mono.variable}`}>
      <body className="flex min-h-[100dvh] flex-col dark:bg-black dark:text-slate-50">
        <header className="">
          <NavBar />
        </header>
        <main className="grow p-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
