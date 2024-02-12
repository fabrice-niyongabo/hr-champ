import NextAuth, { NextAuthConfig } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { connectToDB } from "./lib/connectToDB";
import User from "./models/user";

export const authOptions: NextAuthConfig = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn(params) {
      if (params.account?.provider === "github" && params.user) {
        // console.log(params.user);
        const { email, image, name } = params.user;
        await connectToDB();
        const user = await User.findOne({ email });

        if (!user) {
          await User.create({ email, names: name, image });
        }
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
