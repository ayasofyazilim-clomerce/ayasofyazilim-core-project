import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextRequest, NextResponse } from "next/server";

export const i18n = {
  defaultLocale: "en",
  locales: [
    "de-de",
    "en",
    "es",
    "fi",
    "fr",
    "hi",
    "it",
    "sk",
    "sl",
    "tr",
    "ru",
    "ar",
    "zh-hans",
    "zh-hant",
  ],
};

function getLocaleFromBrowser(request: NextRequest) {
  const negotiatorHeaders: { [key: string]: string } = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));
  const locales = i18n.locales;
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales
  );
  return matchLocale(languages, locales, i18n.defaultLocale);
}
function getLocaleFromCookies(request: NextRequest) {
  const cookieLocale = request.cookies.get("locale")?.value;
  if (cookieLocale && i18n.locales.includes(cookieLocale)) {
    return cookieLocale;
  }
}

function isAutherized(request: NextRequest) {
  const isLogged = request.cookies.get(".AspNetCore.Identity.Application")
    ? true
    : false;
  const publicURLs = [
    "/",
    "login",
    "register",
    "forgot-password",
    "reset-password",
    "404",
    "500",
    "api",
  ];
  const pathName = request.nextUrl.pathname.split("/")[2] || "/";
  if (publicURLs.includes(pathName) || isLogged) {
    return true;
  }

  return false;
}

function localeFromPathname(request: NextRequest) {
  const pathname = request.nextUrl.pathname + "/";
  let returnLocale = i18n.defaultLocale;
  const isLocaleProvided = i18n.locales.find((locale) =>{
    if(pathname.startsWith(`/${locale}/`)){
      returnLocale = locale;
      return locale;
    }
  }
  );
  console.log("locale provided", isLocaleProvided)
  if (isLocaleProvided) {
    return returnLocale;
  }
  return false;
}

function getLocale(request: NextRequest) {
  return getLocaleFromCookies(request) || localeFromPathname(request) || getLocaleFromBrowser(request);
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname + "/";
  const locale = getLocale(request);
  // check .AspNetCore.Identity.Application cookie from the request
  if (!isAutherized(request)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if ( !pathname.startsWith(`/${locale}/`) ){
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}${request.nextUrl.search}`,
        request.url
      )
    );
  }
  
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
