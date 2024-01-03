import { Console } from "console";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import DuendeIdentityServer6 from "next-auth/providers/duende-identity-server6";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    DuendeIdentityServer6({
      id: "id-server",
      clientId: "nextApp",
      clientSecret: "secret",
      issuer: "http://191.101.71.125:5000",
      authorization: { params: { scope: "openid profile auctionApp" } },
      idToken: true,
    }),
  ],
  callbacks: {
    async jwt({ token, profile }) {
      if (profile) {
        token.username = profile.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.username = token.username;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
