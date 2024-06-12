import {
  getMyProfile,
  obtainAccessTokenByRefreshToken,
  signInWithCredentials,
} from "auth-action";
import NextAuth from "next-auth";
import { getToken } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: { label: "Email", type: "text", placeholder: "test@test.com" },
        password: { label: "Password", type: "password" },
      },

      authorize: async (credentials) => {
        try {
          const response = await signInWithCredentials(credentials);
          if (response?.access_token) {
            return { ...response };
          }
          throw new Error("Unknown auth error");
        } catch (error: any) {
          console.error(error);
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user }) {
      if (user) {
        return true;
      }
      return false;
    },
    async session({ session, token }) {
      session.error = token.error;
      const userData = (await getMyProfile(token.access_token)) as any;
      session.user = userData;
      session.access_token = token.access_token;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          access_token: user.access_token,
          expires_at: Math.floor(Date.now() / 1000) + (user.expires_in || 0),
          refresh_token: user.refresh_token,
        };
      } else if (Date.now() < token.expires_at * 1000) {
        return token;
      }
      if (!token.refresh_token) {
        throw new Error("No refresh token");
      }
      const tokens = await obtainAccessTokenByRefreshToken(token.refresh_token);
      return {
        ...token,
        access_token: tokens.access_token,
        expires_at: Math.floor(Date.now() / 1000 + tokens.expires_in),
        refresh_token: tokens.refresh_token ?? token.refresh_token,
      };
    },
  },
});

declare module "next-auth" {
  interface User {
    id?: string;
    access_token?: string;
    expires_in?: number;
    refresh_token?: string;
    userName: string;
  }
}

declare module "next-auth" {
  interface Session {
    error?: "RefreshAccessTokenError";
    access_token?: string;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    access_token: string;
    expires_at: number;
    refresh_token: string;
    error?: "RefreshAccessTokenError";
  }
}
