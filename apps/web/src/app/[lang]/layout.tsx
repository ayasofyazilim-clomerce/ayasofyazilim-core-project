import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import Providers from "../../providers/providers";
import "../globals.css";

interface RootLayoutProps {
  params: { lang: string };
  children: JSX.Element;
}
const appName = process.env.APPLICATION_NAME || "UNIREFUND";
const title = appName.charAt(0).toUpperCase() + appName.slice(1).toLowerCase();

export const metadata: Metadata = {
  title,
  description: "Unirefund is a web app for managing your refund process.",
};
export default function RootLayout({ children, params }: RootLayoutProps) {
  return (
    <html lang={params.lang}>
      <body className={GeistSans.className} data-app-name={appName}>
        <Providers lang={params.lang}>{children}</Providers>
      </body>
    </html>
  );
}
