import { GeistSans } from "geist/font/sans";
import Providers from "../../providers/providers";
import "./../globals.css";

interface IRootLayoutProps {
  params: { lang: string };
  children: JSX.Element;
}

export default function RootLayout({ children, params }: IRootLayoutProps) {
  return (
    <html>
      <body className={GeistSans.className}>
        <Providers lang={params.lang}>{children}</Providers>
      </body>
    </html>
  );
}
