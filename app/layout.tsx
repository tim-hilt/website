import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import {
  faGithub,
  faLinkedin,
  faSquareXing,
  faStackOverflow,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { JetBrains_Mono, Open_Sans } from "next/font/google";
import Link from "next/link";
import type { PropsWithChildren } from "react";
import NavBar from "./nav-bar";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

config.autoAddCss = false;

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

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

function Footer() {
  // TODO: Get SVG for Icons and render them inline instead of using
  // more dependencies
  return (
    <footer className="flex justify-center space-x-5 p-4 text-gray-500 md:p-8 dark:text-gray-200">
      <Link href="mailto:timhilt@live.de" target="_blank">
        <FontAwesomeIcon icon={faEnvelope} />
      </Link>
      <Link href="https://github.com/tim-hilt" target="_blank">
        <FontAwesomeIcon icon={faGithub} />
      </Link>
      <Link
        href="https://stackoverflow.com/users/9076590/tim-hilt"
        target="_blank"
      >
        <FontAwesomeIcon icon={faStackOverflow} />
      </Link>
      <Link
        href="https://www.linkedin.com/in/tim-hilt-2958a11b7/"
        target="_blank"
      >
        <FontAwesomeIcon icon={faLinkedin} />
      </Link>
      <Link href="https://www.xing.com/profile/Tim_Hilt2/" target="_blank">
        <FontAwesomeIcon icon={faSquareXing} />
      </Link>
    </footer>
  );
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html
      lang="en"
      className={`${font_sans.variable} ${font_mono.variable} antialiased`}
    >
      <body className="flex min-h-[100dvh] flex-col dark:bg-black dark:text-gray-50">
        <header className="sticky top-0 bg-white dark:bg-black">
          <NavBar />
        </header>
        <main className="grow px-4 py-2 md:p-8">
          {children}
          <SpeedInsights />
        </main>
        <Footer />
      </body>
    </html>
  );
}
