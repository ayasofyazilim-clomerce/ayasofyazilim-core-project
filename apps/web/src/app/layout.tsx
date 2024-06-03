import { GeistSans } from "geist/font/sans";
import { Inter } from "next/font/google";
import { getLocalizationResources } from "src/utils";
import "./globals.css";
import { Metadata } from "next";
export const inter = Inter({ subsets: ["latin"] });

interface IRootLayoutProps {
  params: { lang: string };
  children: JSX.Element;
}

export const metadata: Metadata = {
  title: "Unirefund",
  description: "Unirefund is a web app for managing your refund process.",
};
export default async function RootLayout({
  children,
  params,
}: IRootLayoutProps) {
  const resources = await getLocalizationResources(params.lang);
  if (!resources) return <></>;

  return (
    <html>
      <body className={GeistSans.className}>{children}</body>
    </html>
  );
}
