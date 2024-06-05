import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { auth } from "auth";
import { NextAuthRequest } from "node_modules/next-auth/lib";

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
const publicURLs = ["/", "projects", "404", "500", "api"];
const authPages = ["login", "register", "forgot-password", "reset-password"];
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

function localeFromPathname(request: NextRequest) {
  const pathname = request.nextUrl.pathname + "/";
  let returnLocale = i18n.defaultLocale;
  const isLocaleProvided = i18n.locales.find((locale) => {
    if (pathname.startsWith(`/${locale}/`)) {
      returnLocale = locale;
      return locale;
    }
  });
  if (isLocaleProvided) {
    return returnLocale;
  }
  return false;
}

function getLocale(request: NextRequest) {
  return (
    getLocaleFromCookies(request) ||
    localeFromPathname(request) ||
    getLocaleFromBrowser(request)
  );
}

export const middleware = auth(async (request: NextAuthRequest) => {
  const hostURL = "http://" + request.headers.get("host") || "";

  function isUserAuthorized(request: NextAuthRequest) {
    return !!request.auth;
  }
  function isPathHasLocale(path: string) {
    return i18n.locales.includes(path.split("/")[1]);
  }
  function redirectToLogin(locale: string) {
    return NextResponse.redirect(new URL(`/${locale}/login`, hostURL));
  }
  function redirectToProfile(locale: string) {
    return NextResponse.redirect(new URL(`/${locale}/profile`, hostURL));
  }
  function redirectToProjects(locale: string) {
    return NextResponse.redirect(new URL(`/${locale}/projects`, hostURL));
  }

  const isAuthorized = isUserAuthorized(request);
  const locale = getLocale(request);
  const pathName = request.nextUrl.pathname.split("/")[2] || "/";

  // If the user is authorized
  if (isAuthorized) {
    // If the user is authorized and the path is unauthorized specific, redirect to profile
    if (authPages.includes(pathName)) {
      return redirectToProjects(locale);
    }

    if (isPathHasLocale(request.nextUrl.pathname)) {
      return NextResponse.next();
    }
    return NextResponse.redirect(
      new URL(`/${locale}${request.nextUrl.pathname}`, hostURL)
    );
  }

  // If the user is not authorized and the path is public, continue
  if (publicURLs.includes(pathName) || authPages.includes(pathName)) {
    if (isPathHasLocale(request.nextUrl.pathname)) {
      return NextResponse.next();
    }

    return NextResponse.redirect(
      new URL(`/${locale}${request.nextUrl.pathname}`, hostURL)
    );
  }

  // If the user is not authorized and the path is authorized specific, redirect to login
  return redirectToLogin(locale);
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
