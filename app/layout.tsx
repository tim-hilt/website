import type { PropsWithChildren } from "react";
import "./globals.css";

export const metadata = {
  title: "Website",
  description: "My personal website",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
