import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "../../providers/providers";
import "./../globals.css";

const metadata: Metadata = {
  title: "Project 0",
  description: "Generated by create turbo",
};
const inter = Inter({ subsets: ["latin"] });

interface IRootLayoutProps {
  params: { lang: string };
  children: JSX.Element;
}

export default function RootLayout({ children, params }: IRootLayoutProps) {
  return (
    <html>
      <body className={inter.className}>
        <Providers lang={params.lang}>{children}</Providers>
      </body>
    </html>
  );
}
