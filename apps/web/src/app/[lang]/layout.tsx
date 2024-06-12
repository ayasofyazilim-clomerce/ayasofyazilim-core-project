import { GeistSans } from "geist/font/sans";
import Providers from "../../providers/providers";
import "./../globals.css";
import { Metadata } from "next";
import { getLocalizationResources } from "src/utils";

interface IRootLayoutProps {
  params: { lang: string };
  children: JSX.Element;
}
const appName = process.env?.APPLICATION_NAME || "UNIREFUND";
const title = appName.charAt(0).toUpperCase() + appName.slice(1).toLowerCase();

export const metadata: Metadata = {
  title: title,
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
      <body className={`${GeistSans.className} overflow-hidden`}>
        <Providers lang={params.lang}>{children}</Providers>
      </body>
    </html>
  );
}
