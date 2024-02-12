import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

const handler = NextAuth({
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
});

export { handler as GET, handler as POST };
