import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const isAllowedToSignIn = true;
      if (isAllowedToSignIn) {
        return true;
      } else {
        return false;
      }
    },
    async redirect({ url, baseUrl }) {
      const lng = url.split("/");
      if (url.endsWith("/login")) return `${baseUrl}/${lng[3]}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },

  providers: [],
} satisfies NextAuthConfig;
