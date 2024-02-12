import NextAuth, { NextAuthConfig } from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions: NextAuthConfig = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn(params) {
      console.log({ params });
      if (params.account?.provider === "github" && params.user) {
        console.log(params.user);
      }
      return true;
    },
  },
  //custom pages
  pages: {
    signIn: "/login",
    // error: "/error",
    // verifyRequest: "/verify-request",
  },
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(authOptions);
