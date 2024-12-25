import NextAuth, { AuthError, DefaultSession, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
// import { getUpwithcrowd } from "./utils/client";
import { GetApiAbpApplicationConfigurationResponse } from "@ayasofyazilim/saas/upwithcrowdService";

const TOKEN_URL = `${process.env.ABP_AUTH_URL}/connect/token`;
const OPENID_URL = `${process.env.ABP_AUTH_URL}/.well-known/openid-configuration`;

type Token = {
  access_token: string;
  token_type: string;
  expires_in: number;
  id_token: string;
  refresh_token: string;
};

// create a function to check object is of type Token
function isToken(obj: unknown): obj is Token {
  if (typeof obj !== "object" || obj === null) return false;
  return "access_token" in obj;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;
        let scopes = "openid profile email";
        const openId_response = await fetch(OPENID_URL);
        const scopes_json = await openId_response.json();
        if ("scopes_supported" in scopes_json) {
          scopes = scopes_json.scopes_supported.join(" ");
        }
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        myHeaders.append("X-Requested-With", "XMLHttpRequest");
        // myHeaders.append("__tenant", credentials.tenantId || "");
        const urlencoded = new URLSearchParams();
        const urlEncodedContent: Record<string, string> = {
          grant_type: "password",
          client_id: "frontend",
          username: "" + credentials.email,
          password: "" + credentials.password,
          scope: scopes,
          client_secret: "frontend",
        };
        Object.keys(urlEncodedContent).forEach((key) => {
          urlencoded.append(key, urlEncodedContent[key]);
        });
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: urlencoded,
        };

        const response = await fetch(TOKEN_URL, requestOptions);
        const json = await response.json();
        if (isToken(json)) {
          const userReuqest = await fetch(
            `${process.env.BASE_URL}/api/abp/application-configuration`,
            {},
          );
          const user_data: GetApiAbpApplicationConfigurationResponse =
            await userReuqest.json();
          const current_user = user_data.currentUser;
          // const upWithCrowdClient = await getUpwithcrowd();
          // const appConfig = await upWithCrowdClient.abpApplicationConfiguration.getApiAbpApplicationConfiguration();
          // const userAbp = appConfig.currentUser;
          let user: User = {
            email: current_user?.email || credentials.email + "",
            name: current_user?.userName || credentials.email + "",
            // image: userAbp?.profilePicture,
            id: current_user?.id || "",
            access_token: json.access_token,
          };
          // console.log("user", user, json);

          // const user = {email: credentials.email, name: credentials.email, id: "1"}
          return { ...user, ...json };
        }
        if ("error" in json && "error_description" in json) {
          // return { error: json.error + ": " + json.error_description };
          throw new AuthError(json.error + ": " + json.error_description);
        }

        if (!user) {
          // No user found, so this is their first attempt to login
          // Optionally, this is also the place you could do a user registration
          throw new Error("Invalid credentials.");
        }
        // id?: string
        // name?: string | null
        // email?: string | null
        // image?: string | null
        // console.log("user", user);
        // return user object with their profile data
        return user;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      // console.log("jwt", user);
      if (user?.access_token) {
        // User is available during sign-in
        token.access_token = user?.access_token;
      }
      return token;
    },
    session({ session, token, user }) {
      // console.log("session", user);
      // `session.user.address` is now a valid property, and will be type-checked
      // in places like `useSession().data.user` or `auth().user`
      return {
        ...session,
        user: {
          ...user,
          ...session.user,
          access_token: token.access_token + "",
        },
      };
    },
  },
});

declare module "next-auth" {
  interface Session {
    user: {
      access_token: string;
    } & DefaultSession["user"];
  }
  interface User {
    access_token?: string;
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }
}