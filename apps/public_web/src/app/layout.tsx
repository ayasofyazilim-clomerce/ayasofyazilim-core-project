import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Project 0",
  description: "Generated by create turbo",
};
export default function RootLayout({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  return (
    <html>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
